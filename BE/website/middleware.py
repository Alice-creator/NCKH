import jwt
import datetime
from ..website import extension, database
import hashlib

secret = 'my-secret'
def encryp(payload):
    return str(jwt.encode(payload, secret, algorithm="HS256"))

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
    token = token.split("'")
    token = token[int(len(token)/2)]
    return jwt.decode(token, secret, verify=True, algorithms=["HS256"])

def update_Like(TID, CID, state):
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

    cursor.execute(
        '''
        select TID from analyse_info
        where TID = %s and CID = %s;
        ''',
        (TID, CID)
    )

    if not cursor.fetchall():
        cursor.execute(
        '''
        insert into analyse_info(TID,CID,likes)
        values(%s,%s,%s);
        ''',
        (TID, CID, 1)
        )
    else:
        cursor.execute(
            '''
            UPDATE analyse_info
            set likes = likes + %s
            where TID = %s and CID = %s;
            ''',
            (state, TID, CID)
        )
    connection.commit()
    
def update_Search(TID, CID):
    connection = database.connect_db()
    cursor = connection.cursor()
    cursor.execute(
        '''
        select TID from analyse_info
        where TID = %s and CID = %s;
        ''',
        (TID, CID)
    )

    if not cursor.fetchall():
        cursor.execute(
            '''
            insert into analyse_info(TID, CID, searchs)
            values(%s,%s,2)
            ''',
            (TID, CID)
        )
    else:
        cursor.execute(
            '''
            UPDATE analyse_info
            set searchs = searchs + 2
            where TID = %s and CID = %s
            ''',
            (TID, CID)
        )
    connection.commit()

def update_SearchByType(searchType, CID):
    connection = database.connect_db()
    cursor = connection.cursor()
    cursor.execute(
            '''
            UPDATE analyse_info
            set searchs = searchs + 1
            where CID = %s and TID in (select TID from attractions
            where attractions.type = %s)
            ''',
            (CID, searchType)
        )
    
    cursor.execute(
            '''
            select TID from attractions 
            where TID not in (select TID from analyse_info 
            where CID = %s) and type = %s;
            ''',
            (CID, searchType)
        )
    data = cursor.fetchall()

    for i in data:
        cursor.execute(
            '''
            insert into analyse_info(tid, cid, searchs)
            values(%s,%s,%s)
            ''',
            (i[0], CID, 1)
        )
    connection.commit()

def toDict(key, value):
    result = list()
    for i in value:
        temp = dict()
        for j in range(len(key)):
            temp[key[j]] = i[j]
        result.append(temp)

    return result

def addAttribute(att, value, temp):
    for i in range(len(temp)):
        temp[i][att] = value
    
    return temp

def one_way_hash(data):
    # Tạo đối tượng băm
    hash_object = hashlib.sha256()

    # Cập nhật đối tượng băm với dữ liệu cần mã hóa
    hash_object.update(data.encode('utf-8'))

    # Lấy giá trị băm
    hashed_data = hash_object.hexdigest()

    return hashed_data

def renew_Contentbased(scores_matrix, users_list, atts_list):
    connection = database.connect_db()
    cursor = connection.cursor()
    cursor.execute(
        '''
        delete from User_content_based;
        '''
    )
    for i in range(len(users_list)):
        for j in range(len(atts_list)):
            cursor.execute(
                '''
                insert into User_content_based(CID, TID, score)
                values(%s, %s, %s);
                ''',
                (users_list[i], atts_list[j], scores_matrix[j][i])
            )
    
    connection.commit()

def renew_Colaborative(scores_matrix, atts_list):
    connection = database.connect_db()
    cursor = connection.cursor()
    cursor.execute(
        '''
        delete from Colaborative_filtering;
        '''
    )
    for i in range(len(atts_list)):
        for j in range(len(atts_list)):
            if i != j:
                cursor.execute(
                    '''
                    insert into Colaborative_filtering(TID1, TID2, score)
                    values(%s, %s, %s);
                    ''',
                    (atts_list[i], atts_list[j], scores_matrix[j][i])
                )
        
    connection.commit()