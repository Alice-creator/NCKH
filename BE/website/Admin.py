from flask_restful import Resource
from flask_restful import request
from website import extension, database
import copy

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