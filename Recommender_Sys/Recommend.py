from BE.website import extension, database, middleware
from flask_restful import Resource, request
from .Utility_matrix import TF_IDF, Utility_matrix, GetDistance
from .Content_based import train
from .Colaborative import train_col
from .Genetic import Genetic
import requests
import numpy as np
import copy
class Recommender(Resource):

    def getUserScore(self, CID):
        connection = database.connect_db()
        cursor = connection.cursor()
        cursor.execute(
            '''
            select searchs, likes from analyse_info
            where CID = %s;
            ''',
            (CID,)
        )
        data = cursor.fetchall()
        scores = 0
        for i in data:
            scores = scores + i[0] + i[1]*3
        
        return scores

    def post(self, language):
        data = requests.get('http://127.0.0.1:5000/Dev/Analyse').json()

        # token = request.headers.get('Authorization')
        # token = token.split(' ')[1]
        # auth = middleware.authentication(token)
        # if not middleware.authentication(token):
        #     return {'status' : False,
        #             'message': 'you need to login first'
        #             }, 401
        # if middleware.authorization(token) != 'Admin':
        #     return {'status' : False,
        #             'message': "you don't have right to access this feature"
        #             }, 403
        ##### get attraction name list
        att_names = list()
        for i in data['attribute']:
            att_names.append(i['attraction name'])
        ##### get utility matrix include user location
        matrix = Utility_matrix(data['attribute'])
        tfidf  = TF_IDF(matrix)
        # print(data['attribute'])
        # print(tfidf.shape)
        # distance = GetDistance((1,1), data['attribute'])
        # tfidf = np.insert(tfidf, -1, distance, axis=1)
        # print(tfidf.shape)

        ##### get user_rating and user list
        rating = list()
        users_list = list()
        for i in data['rating']:
            if i['username'] not in users_list:
                users_list.append(i['username'])
            rating.append((i['attraction name'], i['username'], i['searchs'] + i['likes']*3))
        
        content_score_matrix = train(tfidf, rating, users_list, att_names)
        middleware.renew_Contentbased(content_score_matrix, users_list, att_names)
        
        colaborative_matrix = train_col(tfidf)
        middleware.renew_Colaborative(colaborative_matrix, att_names)
        # print(colaborative_matrix)
        return {
            'message' : 'Update successfully'
        }
    
    def get(self, language):
        ### Tinh user score
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        if not auth:
            return {'status' : False,
                    'message': 'you need to login first',
                    'token': token
                    }, 401
        score = self.getUserScore(auth['CID'])
        connection = database.connect_db()
        cursor = connection.cursor()
        if score <= 10:
            cursor.execute(
                '''
                select viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                from viet_introduction, attractions
                where attractions.tid = viet_introduction.tid and attractions.tid in (
                select tid 
                from analyse_info
                order by (searchs + likes*3) DESC
                Limit 5
                );
                '''
            )
            data = cursor.fetchall()
        elif score > 10 and score <= 20:
            cursor.execute(
                '''
                select viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                from viet_introduction , attractions
                where viet_introduction.tid = attractions.tid and attractions.tid in (
                select tid2 from Colaborative_filtering
                where tid1 = (
                select tid from analyse_info
                where cid = %s
                order by (searchs + likes*3) DESC
                limit 1
                ) order by score DESC
                limit 5
                );
                ''',
                (auth['CID'])
            )
        else:
            cursor.execute(
                '''
                select viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                from viet_introduction, attractions
                where viet_introduction.tid = attractions.tid and attractions.tid in (
                select tid
                from User_content_based
                where CID = %s
                order by score DESC
                limit 5
                );
                ''',
                (auth['CID'],)
            )
        data = cursor.fetchall()
        col_name = ['TID', 'name', 'latitude', 'longitude', 'timezone', 'location_string', 'images', 'address', 'description', 'story', 'likes']
        return middleware.toDict(key=col_name, value=data)

class TourSuggestion(Resource):
    
    def getInfo(self, atts_List):
        distance = list()
        name = list()
        for i in atts_List:
            temp = list()
            for j in atts_List:
                temp.append(round((float(i['latitude']) - float(j['latitude']))**2 + (float(i['longitude']) - float(j['longitude']))**2, 4))
            distance.append(temp)
            name.append(i['attraction name'])
        return distance, name

    def addPath(self, addedAtt, pointMatrix):
        state = addedAtt[-1]
        # indexs = list()
        temp = pointMatrix[state]
        maxPointIndex = max(temp)
        minPointIndex = None
        while minPointIndex != 0 and not(minPointIndex):
            minArg = temp.index(min(temp))
            if minArg in addedAtt:
                temp[minArg] = maxPointIndex + 1
            else:
                minPointIndex = minArg
        addedAtt.append(minPointIndex)
        return addedAtt
    
    def createPath(self, pointMatrix, nameList):
        bestMinPoint = None
        bestConfig = None
        # print(pointArray)
        for i in nameList:
            state = list([i])
            point = 0
            while len(state) < len(nameList):
                temp = copy.deepcopy(pointMatrix)
                state = self.addPath(state, temp)
                point += pointMatrix[state[-2]][state[-1]]

                if bestConfig != None and bestMinPoint <= point:
                    break

            if bestConfig == None or bestMinPoint > point:
                bestConfig = state
                bestMinPoint = point

        return bestConfig


    def post(self, latitude, longitude, language, time):
        data = requests.get('http://127.0.0.1:5000/Dev/Analyse').json()
        distance, name = self.getInfo(data['attribute'])
        index = [i for i in range(len(name))]
        path = self.createPath(distance, index)

        connection = database.connect_db()
        cursor = connection.cursor()
        cursor.execute(
            '''
            delete from tour;
            '''
        )
        for i in range(len(path)):
            cursor.execute(
                '''
                insert into Tour(TID, travelOrder)
                values(%s, %s);
                ''',
                (name[path[i]], i)
            )
        connection.commit()
        return  {
            'data': path,
            'message' : 'update sucessfully'
        }
    
    def get(self, latitude, longitude, language, time):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        if not auth:
            return {'status' : False,
                    'message': 'you need to login first'
                    }, 401
        connection = database.connect_db()
        cursor = connection.cursor()
        cursor.execute(
            '''
            select travelorder from viet_introduction, tour
            where viet_introduction.tid = tour.tid and
            (longitude / %s >= 0.85 and longitude / %s <= 1.15
            and latitude / %s >= 0.85 and latitude / %s <= 1.15) LIMIT 1;
            ''',
            (longitude, longitude, latitude, latitude)
        )
        try:
            GPS = str(cursor.fetchone()[0])
        except:
            return {
                'message': "you are out of range"
            }, 200
        
        cursor.execute(
            '''
            select sum(score) from User_content_based, Tour
            where CID = %s and User_content_based.tid = Tour.tid
            and travelOrder < %s
            LIMIT %s;
            ''',
            (auth['CID'], GPS, time*4)
        )
        up = cursor.fetchone()[0]

        cursor.execute(
            '''
            select sum(score) from User_content_based, Tour
            where CID = %s and User_content_based.tid = Tour.tid
            and travelOrder > %s
            LIMIT %s;
            ''',
            (auth['CID'], GPS, time*4)
        )
        down = cursor.fetchone()[0]
        
        if up == None or (down != None and up != None and down > up):
            cursor.execute(
            '''
            select Tour.TID, score, travelorder, attribute from Tour, User_content_based, viet_introduction
            where Tour.tid = User_content_based.tid and Tour.tid = viet_introduction.tid and CID = %s and travelOrder > %s
            LIMIT %s;
            ''',
            (auth['CID'], GPS, time*4)
            )
        else:
            cursor.execute(
            '''
            select Tour.TID, score, travelorder, attribute from Tour, User_content_based, viet_introduction
            where Tour.tid = User_content_based.tid and Tour.tid = viet_introduction.tid and CID = %s and travelOrder < %s
            LIMIT %s;
            ''',
            (auth['CID'], GPS, time*4)
            )
        
        tour = cursor.fetchall()
        for i in range(len(tour)):
            tour[i] = list(tour[i])
            if 'restaurant' in tour[i][3]:
                tour[i][1] += 0.5
            if 'hotel' in tour[i][3]:
                tour[i][1] += 0.4
        
        tour.sort(key=lambda x: x[1], reverse=True)
        tour = tour[: time*3]
        tour.sort(key=lambda x: x[2])

        result = list()
        for i in tour:
            cursor.execute(
                '''
                SELECT viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                FROM viet_introduction , attractions
                where attractions.TID = %s and viet_introduction.tid = attractions.tid;
                ''',
                (i[0],)
            )
            result.append(cursor.fetchone())
        col_name = ['TID', 'name', 'latitude', 'longitude', 'timezone', 'location_string', 'images', 'address', 'description', 'story', 'likes']
        result = middleware.toDict(col_name, result)
        return {
            'GPS': GPS,
            'Tour': result
        }