from flask_restful import Resource
from flask_restful import request
from flask import send_file
from PIL import Image
from flask import jsonify
import os, io
import numpy as np
from BE.website import extension, database, middleware

class Storage(Resource):
    def post(self, language):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        if not auth:
            return {'status' : False,
                    'message': 'you need to login first'
                    }
        connection = database.connect_db()
        cursor = connection.cursor()
        # data = extension.create_json(request.values.lists())
        data = request.get_json()
        print(data)
        cursor.execute(
            '''
            select count(TID) from user_storage
            where CID = %s and TID = %s;
            ''',
            (auth['CID'], request.json['TID'],)
        )
        try:
            temp = cursor.fetchone()[0]
            if temp < 1:
                cursor.execute(
                    '''
                    insert into user_storage(CID, TID)
                    values(%s, %s);
                    ''',
                    (auth['CID'], request.json['TID'])
                )
                connection.commit()
                middleware.update_Like(request.json['TID'],  auth['CID'], 1)
                return {
                    'status': True,
                    'message': 'Success'
                }, 200
            return {
                'status': False,
                'message': 'This place already in your favourite storage'
            }, 200
        except:
            return {
                'status': False,
                'message': 'Check your input data'
            }, 400
    
    def get(self, language):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        print(token)
        auth = middleware.authentication(token)
        if not auth:
            return {'status' : False,
                    'message': 'you need to login first'
                    }
        connection = database.connect_db()
        cursor = connection.cursor()
        if language.lower().strip() in 'vietnam':
            cursor.execute(
                '''
                select viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes from viet_introduction, user_storage, attractions
                where cid = %s and viet_introduction.tid = user_storage.tid and user_storage.tid = attractions.tid;
                ''',
                (auth['CID'],)
            )
        else:
            cursor.execute(
                '''
                select eng_introduction.tid, eng_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes from eng_introduction, user_storage, attractions
                where cid = %s and eng_introduction.tid = user_storage.tid and user_storage.tid = attractions.tid;
                ''',
                (auth['CID'],)
            )
        col_name = ['TID', 'name', 'latitude', 'longitude', 'timezone', 'location_string', 'images', 'address', 'description', 'story', 'likes']
        # print(middleware.toDict(key=col_name, value=cursor.fetchall()))
        return {'info': middleware.toDict(key=col_name, value=cursor.fetchall())}
    
    def delete(self, language):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        if not auth:
            return {'status' : False,
                    'message': 'you need to login first'
                    }, 401
        
        data = extension.create_json(request.values.lists())
        connection = database.connect_db()
        cursor = connection.cursor()

        cursor.execute(
            '''
            delete from user_storage
            where CID = %s and TID = %s
            ''',
            (auth['CID'], request.json['TID'],)
        )

        connection.commit()
        middleware.update_Like(request.json['TID'], -1)
        return{
            'status': True,
            'message': 'Successfully deleted'
        }
    
class Feedback(Resource):
    def post(self):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        data = extension.create_json(request.values.lists())
        if not auth:
            return {'status' : False,
                    'message': 'you need to login first'
                    }
        connection = database.connect_db()
        cursor = connection.cursor()
        try:
            cursor.execute(
                '''
                insert into comments(CID, comment)
                values(%s, %s);
                ''',
                (auth['CID'], request.json['feedback'])
            )
            connection.commit()
            cursor.close()
            
            return {
                'status': True,
                'message': 'successfully sent'
            }, 200
        except:
            return {
                'status': False,
                'message': 'Please enter your feedback'
            }, 400
    
    def get(self):
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
        cursor.execute(
            '''
            select username, comment from comments, account_info
            where comments.cid = account_info.cid;
            '''
        )
        col_name = ['username', 'feedback']

        return {
            middleware.toDict(key=col_name, value=cursor.fetchall())
        }, 200

class GetImg(Resource):
    def get(self, CID):
        connection = database.connect_db()
        cursor = connection.cursor()
        data = extension.create_json(request.values.lists())
        cursor.execute(
            '''
            select image_path from user_post_image
            WHERE CID = %s;
            ''',
            (CID,)
        )
        img = open(cursor.fetchone()[0], 'rb')
        return send_file(img, mimetype='image/jpeg')