from BE.website import extension, database, middleware
from flask_restful import Resource, request
from .Utility_matrix import TF_IDF, Utility_matrix, GetDistance
from .Content_based import train
from .Colaborative import train_col
import requests
import numpy as np
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