from flask_restful import Resource
from flask_restful import request
from website import extension, database
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
                (request.json['gmail'], request.json['username'], request.json['password'], request.json['gmail'])
            )
            connection.commit()
            if len(cursor.fetchone()) == 1:
                return {
                    'status': True,
                    'role': 'User'
                }, 200
        except:
            return {
                'status': False,
                'role': None
            }, 403

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
                (request.json['gmail'], request.json['password'])
            )
            CID = cursor.fetchone()
            cursor.execute(
                '''
                select count(CID) from user_info where CID = %s;
                ''',
                (CID[0],)
            )
            if cursor.fetchone()[0] == 1:
                return {
                    'status': True,
                    'CID': CID[0],
                    'username': CID[1],
                    'role': 'User'
                }, 200
            else:
                return {
                    'status': True,
                    'CID': CID[0],
                    'username': CID[1],
                    'role': 'Admin'
                }, 200
        except:
            return {
                'status': False,
                'role': None
            }, 409

class ChangeInfo(Resource):
    def put(self, CID):
        connection = database.connect_db()
        cursor = connection.cursor()
        data = extension.create_json(request.values.lists())
        cursor.execute(
            '''
            select count(CID) from account_info
            where CID = %s
            ''',
            (CID,)
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
                    (data['gmail'], data['username'], data['password'], CID,)
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