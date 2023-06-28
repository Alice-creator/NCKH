from BE.website import extension, database, middleware
from flask_restful import Resource, request
from .Utility_matrix import TF_IDF, Utility_matrix, GetDistance
from .Content_based import train
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

        ##### get user_rating and user list
        rating = list()
        users_list = list()
        for i in data['rating']:
            if i['username'] not in users_list:
                users_list.append(i['username'])
            rating.append((i['attraction name'], i['username'], i['searchs'] + i['likes']*3))
        
        train(tfidf, rating, users_list, att_names)
        return {
            'data' : str(tfidf)
        }
    
    def get(self, CID):
        ### Tinh user score

        # if score <= 10:
        #     return 5 most popular
        
        # if score <= 20:
        #     return 5 most similar with highest score Attr
        
        # else:
        #     return 5 highest acordding to content based

        return None