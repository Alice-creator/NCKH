from flask_restful import Resource
from flask_restful import request
from PIL import Image
from flask import jsonify
import os, io
from website import extension, database

class TouristAttraction(Resource):
    def post(self):
        #input 
        return #file json

class Storage(Resource):
    def post(self):
        connection = database.connect_db()
        cursor = connection.cursor()
        data = extension.create_json(request.values.lists())

        cursor.execute(
            ''' 
            select count(TID) from storage
            where CID = %s and TID = %s;
            ''',
            (data['CID'], data['TID'])
        )
        try:
            temp = cursor.fetchone()[0]
            if temp < 1:
                cursor.execute(
                    '''
                    insert into storage(CID, TID)
                    values(%s, %s);
                    ''',
                    (data['CID'], data['TID'])
                )
                connection.commit()
                return {
                    'status': True,
                    'CID': data['CID'],
                    'TID': data['TID']
                }, 200
            return {
                'status': False,
                'CID': None,
                'TID': None
            }, 404
        except:
            return {
                'status': False,
                'CID': None,
                'TID': None
            }, 400
    
    def get(self):
        connection = database.connect_db()
        cursor = connection.cursor()
        data = extension.create_json(request.args.lists())
        cursor.execute(
            '''
            select tourist_attraction.tid, description_path, likes from tourist_attraction, storage
            where cid = %s and tourist_attraction.tid = storage.tid;
            ''',
            (data['CID'],)
        )
        return {'status': cursor.fetchall()}
    
class Bonus(Resource):
    def post(self):
        connection = database.connect_db()
        cursor = connection.cursor()
        data = extension.create_json(request.values.lists())
        try:
            cursor.execute(
                '''
                insert into bonus(CID, comment)
                values(%s, %s);
                ''',
                (data['CID'], data['comment'])
            )
            connection.commit()
            cursor.close()
            
            return {
                'status': True
            }, 200
        except:
            return {
                'status': False
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
        img = Image.open(cursor.fetchone()[0])
        print(img)
        # print(img.show())
        # img = io.BytesIO(img)
        # print(img)
        return jsonify({'status': img})
        