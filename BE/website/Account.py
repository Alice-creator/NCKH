from flask_restful import Resource
from flask_restful import request
import requests
from ..website import extension, database, middleware
class SignUp(Resource):
    def post(self):
        connection = database.connect_db()
        cursor = connection.cursor()
        data = extension.create_json(request.values.lists())
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
        connection = database.connect_db()
        cursor = connection.cursor()
        data = extension.create_json(request.values.lists())
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
            return {
                'status': True,
                'username': CID[1],
                'token': middleware.encryp(payload=payload)
            }, 200
        except:
            return {
                'status': False,
                'username': None,
                'token': None
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
        data = extension.create_json(request.values.lists())
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
        token = token.split(' ')[1]
        if not middleware.authentication(token):
            return {'status' : False,
                    'message': 'you need to login first'
                    }, 401
        auth = middleware.authentication(token)
        connection = database.connect_db()
        cursor = connection.cursor()

        result = {
        }
        if language.lower().strip() in 'vietnam':
            if searchType.lower() == 'all':
                cursor.execute(
                    '''
                    select attractions.tid, viet_introduction.name, location_string, images, address, description from viet_introduction, attractions
                    where viet_introduction.tid = attractions.tid;
                    ''',
                    (searchType,)
                )
            else:
                cursor.execute(
                    '''
                    select attractions.tid, viet_introduction.name, location_string, images, address, description from viet_introduction, attractions
                    where type = %s and viet_introduction.tid = attractions.tid;
                    ''',
                    (searchType,)
                )
        else:
            if searchType.lower() == 'all':
                cursor.execute(
                    '''
                    select attractions.tid, eng_introduction.name, location_string, images, address, description from eng_introduction, attractions
                    where type = %s and eng_introduction.tid = attractions.tid;
                    ''',
                    (searchType,)
                )
            else:
                cursor.execute(
                    '''
                    select attractions.tid, eng_introduction.name, location_string, images, address, description from eng_introduction, attractions
                    where eng_introduction.tid = attractions.tid;
                    ''',
                    (searchType,)
                )
        
        result['search'] = cursor.fetchall()

        cursor.execute(
            '''
            select tid from user_storage
            where cid = %s
            ''',
            (auth['CID'],)
        )
        result['stored'] = cursor.fetchall()

        return result

class ExternalSearch(Resource):
    def get(self, language, key):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        if not middleware.authentication(token):
            return {'status' : False,
                    'message': 'you need to login first'
                    }, 401
        
        url = "https://travel-advisor.p.rapidapi.com/locations/search"

        querystring = {"limit":"10","offset":"0","units":"km","location_id":"1","currency":"USD","sort":"relevance","lang":"en_US"}
        querystring['query'] = key
        if language.lower().strip() in 'vietnam':
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
            rs = {
                'name': result['name'],
                'location_string': result['location_string'],
                'photo': result['photo'],
            }
            if 'geo_description' in result:
                rs['description'] = result['geo_description']
            searchs.append(rs)
        
        return {
            'result': searchs
        }, 200