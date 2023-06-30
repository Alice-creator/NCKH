from flask_restful import Resource
from flask_restful import request
from BE.website import extension, database, middleware
import copy
import json
class UserInfo(Resource):
    def get(self):
        connection = database.connect_db()
        cursor = connection.cursor() 
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
        data = extension.create_json(request.values.lists())
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
        data = extension.create_json(request.values.lists())
        connection = database.connect_db()
        cursor = connection.cursor()
        files = request.files

        cursor.execute(
            '''
            call insertourist(%s, %s, %s);
            ''',
            (data['name'], data['type'], 0,)
        )
        
        cursor.execute(
            '''
            call insertintro_viet(%s, %s, %s, %s, %s, %s, %s, %s, %s);
            ''',
            (data['vie_name'], data['latitude'], data['longitude'], data['timezone'], data['location_string'], data['images'], data['vie_address'], data['vie_description'], data['vie_story'],)
        )
        cursor.execute(
            '''
            call insertintro_eng(%s, %s, %s, %s, %s, %s, %s, %s, %s);
            ''',
            (data['eng_name'], data['latitude'], data['longitude'], data['timezone'], data['location_string'], data['images'], data['eng_address'], data['eng_description'], data['eng_story'],)
        )
        connection.commit()
        
        return {       
            'status': True,
            'message': 'Update completed'
        }

    def put(self):
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
        data = extension.create_json(request.values.lists())
        connection = database.connect_db()
        cursor = connection.cursor()

        cursor.execute(
            '''
            UPDATE attractions
            set name = %s, type = %s
            where TID = %s;
            ''',
            (data['name'], data['type'], data['TID'],)
        )

        cursor.execute(
            '''
            UPDATE viet_introduction
            set name = %s, latitude = %s, longitude = %s, timezone = %s, location_string =%s, images = %s, address = %s, description = %s, story = %s
            where TID = %s
            ''',
            (data['vie_name'], data['latitude'], data['longitude'], data['timezone'], data['location_string'], data['images'], data['vie_address'], data['vie_description'], data['vie_story'], data['TID'])
        )

        cursor.execute(
            '''
            UPDATE eng_introduction
            set name = %s, latitude = %s, longitude = %s, timezone = %s, location_string =%s, images = %s, address = %s, description = %s, story = %s
            where TID = %s
            ''',
            (data['eng_name'], data['latitude'], data['longitude'], data['timezone'], data['location_string'], data['images'], data['eng_address'], data['eng_description'], data['eng_story'], data['TID'])
        )

        connection.commit()

        return {       
            'status': True,
            'message': 'Update completed'
        }
    