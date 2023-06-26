from BE.website import extension, database, middleware
from flask_restful import Resource, request
from .Utility_matrix import TF_IDF, Utility_matrix, GetDistance
import requests
import numpy as np
class Recommender(Resource):
    def post(self, CID):
        data = requests.get('http://127.0.0.1:5000/Dev/Analyse').json()
        matrix = Utility_matrix(data['attribute'])
        tfidf  = TF_IDF(matrix)
        # print(data['attribute'])
        # print(tfidf.shape)
        distance = GetDistance((1,1), data['attribute'])
        tfidf = np.insert(tfidf, -1, distance, axis=1)
        # print(tfidf.shape)
        return {
            'data' : str(tfidf)
        }
    
    def get(self, CID):
        return None 