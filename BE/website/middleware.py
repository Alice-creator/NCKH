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

def update_Like(TID, state):
    connection = database.connect_db()
    cursor = connection.cursor()
    cursor.execute(
        '''
        UPDATE attractions
        set likes = likes + %s
        where TID = %s;
        ''',
        (state, TID)
    )
    connection.commit()

    
def update_Search(TID):
    connection = database.connect_db()
    cursor = connection.cursor()
    cursor.execute(
            '''
            UPDATE analyse_info
            set searchs = searchs + 1
            where TID = %s;
            ''',
            (TID,)
        )
    connection.commit()