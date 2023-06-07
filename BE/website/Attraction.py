from flask_restful import Resource
from flask_restful import request
from website import extension, database
import json

def insertAttraction():
    f = open('../Model/model_class.json')
    data = json.load(f)
    connection = database.connect_db()
    cursor = connection.cursor()
    for i in data:
        cursor.execute(
            '''
            call insertourist(%s, %s);
            ''',
            (data[i],i,)
        )
    connection.commit()