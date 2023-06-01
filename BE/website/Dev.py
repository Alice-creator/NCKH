from flask_restful import Resource
from flask_restful import request
from ..website import extension, database, middleware
import copy
import json

class RootAttraction(Resource):
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
                print(i['name'])
                cursor.execute(
                    '''
                    call insertintro_viet(%s, %s, %s,%s, %s, %s, %s, %s,%s);
                    ''',
                    (i['name'], i['latitude'], i['longitude'], i['timezone'], i['location_string'], i['images'], i['address'], i['description'], i['story'])
                )

            for i in intro_eng:
                cursor.execute(
                    '''
                    call insertintro_eng(%s, %s, %s,%s, %s, %s, %s, %s,%s);
                    ''',
                    (i['name'], i['latitude'], i['longitude'], i['timezone'], i['location_string'], i['images'], i['address'], i['description'], i['story'])
                )
        connection.commit()
        return {       
            'status': True,
            'message': 'Update completed'
        }