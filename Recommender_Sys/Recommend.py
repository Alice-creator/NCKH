from BE.website import extension, database, middleware
from flask_restful import Resource, request
from .Utility_matrix import Utility_matrix
class Recommender(Resource):
    def post(self, CID):
        return {
            'data' : Utility_matrix()
        }
    
    def get(self, CID):
        return None