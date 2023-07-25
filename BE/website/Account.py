from flask_restful import Resource, request
import requests
from flask import *
from BE.website import extension, database, middleware

class SignUp(Resource):
    def post(self):
        connection = database.connect_db()
        cursor = connection.cursor()
        data = request.get_json()
        data['password'] = middleware.one_way_hash(data['password'])
        print(data['gmail'])
        # data = extension.create_json(request.values.lists())
        try:
            cursor.execute(
                '''
                call insertaccount(%s, %s, %s);
                select user_info.CID from user_info, account_info 
                where user_info.cid = account_info.cid and gmail = %s;
                ''',
                (data['gmail'], data['username'], data['password'], data['gmail'])
            )
            connection.commit()
            if len(cursor.fetchone()) == 1:
                return {
                    'status': True,
                    'role': 'User',
                    'message': 'successfully sign-up'
                }, 200
        except:
            return {
                'status': False,
                'role': None,
                'message': 'email or password is already taken'
            }, 409

class Login(Resource):
    def post(self):
        alpha = 0
        connection = database.connect_db()
        cursor = connection.cursor()
        data = request.get_json()
        data['password'] = middleware.one_way_hash(data['password'])
        # data = extension.create_json(request.values.lists())
        alpha = 1
        try:
            cursor.execute(
                '''
                select CID, username from account_info 
                where gmail = %s and password = %s;
                ''',
                (data['gmail'], data['password'])
            )
            CID = cursor.fetchone()
            cursor.execute(
                '''
                select count(CID) from user_info where CID = %s;
                ''',
                (CID[0],)
            )
            if cursor.fetchone()[0] == 1:
                payload =  {
                    'CID': CID[0],
                    'role': 'User',
                    'language': 'Vietnamese'
                }
            else:
                payload = {
                    'CID': CID[0],
                    'role': 'Admin',
                    'language': 'Vietnamese'
                }
            alpha = 2
            # Lưu token vào sesion
            # print(type(CID[1]), type(middleware.encryp(payload=payload)))
            # token = middleware.encryp(payload=payload)
            alpha = 3
            return {
                'status': True,
                'username': CID[1],
                'role': payload['role'],
                'token': 'temp',
                'alpha': alpha
            }, 200
        except:
            return {
                'status': False,
                'username': None,
                'token': None,
                'data': data['gmail'],
                'alpha': alpha
            }, 401

class ChangeInfo(Resource):
    def put(self):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        if not auth:
            return {'status' : False,
                    'message': 'you need to login first'
                    }, 401
        connection = database.connect_db()
        cursor = connection.cursor()
        data = request.get_json()
        # data = extension.create_json(request.values.lists())
        data['password'] = middleware.one_way_hash(data['password'])

        cursor.execute(
            '''
            select count(CID) from account_info
            where CID = %s
            ''',
            (auth['CID'],)
        )

        try:
            Account = cursor.fetchone()[0]
            if Account == 1:
                cursor.execute(
                    '''
                    UPDATE account_info
                    set gmail = %s, username = %s, password = %s
                    where CID = %s;   
                    ''',
                    (data['gmail'], data['username'], data['password'], auth['CID'],)
                )
                connection.commit()
                data['status'] = True
                return data, 200
            return {
                'status': False
            }, 404
        except:
            return {
                'status': False
            }, 400
        
class SearchByType(Resource):
    def get(self, language, searchType):
        token = request.headers.get('Authorization')
        auth = {
            'CID' : 'CID000'
        }
        token = token.split(' ')[1]
        if middleware.authentication(token):
            auth = middleware.authentication(token)
        connection = database.connect_db()
        cursor = connection.cursor()
        result = {
        }
        if language.lower().strip() in 'vietnam':
            if searchType.lower() == 'all':
                cursor.execute(
                    '''
                    SELECT viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                    FROM viet_introduction, attractions
                    WHERE viet_introduction.tid = attractions.tid and attractions.type != 'Unknown' and viet_introduction.tid not in ( select viet_introduction.tid from attractions, viet_introduction, user_storage
                    where attractions.tid = viet_introduction.tid and user_storage.cid = %s
                    and user_storage.tid = viet_introduction.tid
                    );
                    ''',
                    (auth['CID'],)
                )
                result['notStored'] = cursor.fetchall()

                cursor.execute(
                    '''
                    select viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                    from viet_introduction, attractions, user_storage
                    where attractions.tid = viet_introduction.tid and user_storage.cid = %s
                    and user_storage.tid = viet_introduction.tid;
                    ''',
                    (auth['CID'],)
                )

                result['stored'] = cursor.fetchall()
            else:
                cursor.execute(
                    '''
                    select viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes 
                    from viet_introduction, attractions, user_storage
                    where attractions.tid = viet_introduction.tid and user_storage.cid = %s
                    and user_storage.tid = viet_introduction.tid and attractions.type = %s;
                    ''',
                    (auth['CID'], searchType,)
                )

                result['stored'] = cursor.fetchall()

                cursor.execute(
                    '''
                    SELECT viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                    FROM viet_introduction, attractions
                    WHERE viet_introduction.tid = attractions.tid and attractions.type = %s and viet_introduction.tid not in ( select viet_introduction.tid from attractions, viet_introduction, user_storage
                    where attractions.tid = viet_introduction.tid and user_storage.cid = %s
                    and user_storage.tid = viet_introduction.tid
                    );
                    ''',
                    (searchType, auth['CID'],)
                )
                result['notStored'] = cursor.fetchall()

        else:
            if searchType.lower() == 'all':
                cursor.execute(
                    '''
                    SELECT eng_introduction.tid, eng_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                    FROM eng_introduction, attractions
                    WHERE eng_introduction.tid = attractions.tid and attractions.type != 'Unknown' and eng_introduction.tid not in ( select eng_introduction.tid from attractions, eng_introduction, user_storage
                    where attractions.tid = eng_introduction.tid and user_storage.cid = %s
                    and user_storage.tid = eng_introduction.tid
                    );
                    ''',
                    (auth['CID'],)
                )
                result['notStored'] = cursor.fetchall()

                cursor.execute(
                    '''
                    select eng_introduction.tid, eng_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                    from eng_introduction, attractions, user_storage
                    where attractions.tid = eng_introduction.tid and user_storage.cid = %s
                    and user_storage.tid = eng_introduction.tid;
                    ''',
                    (auth['CID'],)
                )

                result['stored'] = cursor.fetchall()
            else:
                cursor.execute(
                    '''
                    select eng_introduction.tid, eng_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                    from eng_introduction, attractions, user_storage
                    where attractions.tid = eng_introduction.tid and user_storage.cid = %s
                    and user_storage.tid = eng_introduction.tid and attractions.type = %s;
                    ''',
                    (auth['CID'], searchType,)
                )

                result['stored'] = cursor.fetchall()

                cursor.execute(
                    '''
                    SELECT eng_introduction.tid, eng_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                    FROM eng_introduction, attractions
                    WHERE eng_introduction.tid = attractions.tid and attractions.type = %s and eng_introduction.tid not in ( select eng_introduction.tid from attractions, eng_introduction, user_storage
                    where attractions.tid = eng_introduction.tid and user_storage.cid = %s
                    and user_storage.tid = eng_introduction.tid
                    );
                    ''',
                    (searchType, auth['CID'],)
                )
                result['notStored'] = cursor.fetchall()
                middleware.update_SearchByType(searchType, auth['CID'])
        col_name = ['TID', 'name', 'latitude', 'longitude', 'timezone', 'location_string', 'images', 'address', 'description', 'story', 'likes']
        
        result['notStored'] = middleware.toDict(col_name, result['notStored'])
        result['stored'] = middleware.toDict(col_name, result['stored'])
        result['notStored'] = middleware.addAttribute('Stored', False, result['notStored'])
        result['stored'] = middleware.addAttribute('Stored', True, result['stored'])
        final = result['stored']
        final.extend(result['notStored'])
        return final
    
class ExternalSearch(Resource):
    def get(self, language, key):        
        url = "https://travel-advisor.p.rapidapi.com/locations/search"

        querystring = {"limit":"15","offset":"0","units":"km","location_id":"1","currency":"USD","sort":"relevance","lang":"en_US"}
        querystring['query'] = key
        if language.lower().strip() in 'vi':
            querystring['lang'] = 'vi'
            
        headers = {
            "X-RapidAPI-Key": "0b09af9f67mshd7ec0a82fbe69e6p137760jsnb3e029261ab3",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)

        data = response.json()
        searchs = list()

        result = data['data'][0]['result_object']

        for i in data['data']:
            result = i['result_object']
            if result['timezone'] == 'Asia/Ho_Chi_Minh':                
                rs = {
                    'name': result['name'],
                    'location_string': result['location_string'],
                    'photo': result['photo']['images']['original']['url'],
                    'address': result.get('address', result.get('location_string')),
                    'rating': result.get('rating', 'None'),
                    'latitude': result['latitude'],
                    'longitude': result['longitude'],
                }
                if 'geo_description' in result:
                    rs['description'] = result['geo_description']
                searchs.append(rs)
        return {
            'result': searchs
        }, 200