from BE.website import extension, database, middleware
from flask_restful import Resource, request
from .Utility_matrix import TF_IDF, Utility_matrix, GetDistance
import requests
import numpy as np
class Recommender(Resource):
    def post(self, CID):
        data = requests.get('http://127.0.0.1:5000/Dev/Analyse').json()
        ##### get attraction name list
        att_names = list()
        for i in data['attribute']:
            att_names.append(i['attraction name'])
        ##### get utility matrix include user location
        matrix = Utility_matrix(data['attribute'])
        tfidf  = TF_IDF(matrix)
        # print(data['attribute'])
        # print(tfidf.shape)
        distance = GetDistance((1,1), data['attribute'])
        tfidf = np.insert(tfidf, -1, distance, axis=1)
        # print(tfidf.shape)

        ##### get user_rating
        rating = list()
        for i in data['rating']:
            rating.append((i['attraction name'], i['username'], i['searchs'] + i['likes']*3))
        return {
            'data' : str(tfidf)
        }
    
    def get(self, CID):
        return None 