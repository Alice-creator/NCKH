import jwt
import datetime
from ..website import extension, database

secret = 'my-secret'
def encryp(payload):
    payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    return jwt.encode(payload, secret, algorithm="HS256")

def authentication(token):
    connection = database.connect_db()
    cursor = connection.cursor()
    try:
        data = decryp(token)
        cursor.execute(
            '''
            select cid from account_info
            where cid = %s;
            ''',
            (data['CID'],)
        )
        validation = cursor.fetchone()
        if validation != None:
            return data
    except:
        return None

def authorization(token):
    connection = database.connect_db()
    cursor = connection.cursor()
    try:
        data = decryp(token)
        return data['role']
    except:
        return None
    
def decryp(token):
    return jwt.decode(token, secret, verify=True, algorithms=["HS256"])