from flask_restful import Resource
from flask_restful import request
from ..website import extension, database, middleware
import copy
import json
class UserInfo(Resource):
    def get(self):
        connection = database.connect_db()
        cursor = connection.cursor()
        data = extension.create_json(request.values.lists())

        try:
            cursor.execute(
                '''
                select account_info.cid, gmail, username, password from account_info, user_info
                WHERE user_info.CID = account_info.CID;
                '''
            )
            return {
                'status': True,
                'data': cursor.fetchall()
            }
        except:
            return {
                'status': False
            }

class UserInfoDetail(Resource):
    def delete(self, CID):
        connection = database.connect_db()
        cursor = connection.cursor()
        data    = extension.create_json(request.values.lists())
        try:
            cursor.execute(
                '''
                select *from account_info 
                where CID = %s;
                ''',
                (CID,)
            )
            
            UserInfo = copy.deepcopy(cursor.fetchone())
            cursor.execute(
                '''
                delete from bonus
                where CID = %s;
                delete from storage
                where CID = %s;
                delete from user_info
                where CID = %s;
                delete from account_info
                where CID = %s;
                ''',
                (CID,CID,CID,CID,)
            )
            connection.commit()
            return {
                'status': True,
                'data': UserInfo
            }, 200
        except:
            return {
                'status': False
            }, 400

class Attractions(Resource):
    def post(self):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        if not middleware.authentication(token):
            return {'status' : False,
                    'message': 'you need to login first'
                    }, 401
        if middleware.authorization(token) != 'Admin':
            return {'status' : False,
                    'message': "you don't have right to access this feature"
                    }, 403
        connection = database.connect_db()
        cursor = connection.cursor()
        files = request.files

        if 'attractions' in files:
            attractions = files['attractions'].read().decode('utf-8')
            attractions = json.loads(attractions)
            for i in attractions:
                for j in attractions[i]:
                    for k in attractions[i][j]:
                        # print(k, attractions[i][j][k], j, 0)
                        cursor.execute(
                            '''
                            call insertourist(%s, %s, %s);
                            ''',
                            (attractions[i][j][k], j, 0)
                        )
        
        if 'introductions' in files:
            introductions = files['introductions'].read().decode('utf-8')
            introductions = json.loads(introductions)
            intro_vie = introductions[::2]
            intro_eng = introductions[1::2]

            for i in intro_vie:
                cursor.execute(
                    '''
                    call insertintro_viet(%s, %s, %s, %s, %s);
                    ''',
                    (i['name'], i['location_string'], i['images'], i['address'], i['description'])
                )

            for i in intro_eng:
                cursor.execute(
                    '''
                    call insertintro_eng(%s, %s, %s, %s, %s);
                    ''',
                    (i['name'], i['location_string'], i['images'], i['address'], i['description'])
                )
        connection.commit()
        return {       
            'status': True,
            'message': 'Update completed'
        }