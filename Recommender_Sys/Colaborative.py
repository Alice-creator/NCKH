from BE.website import extension, database, middleware
from flask_restful import Resource, request
from .Utility_matrix import TF_IDF, Utility_matrix, GetDistance
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def train_col(tf_idf):
    atts_num = tf_idf.shape[0]
    scores = list()
    for i in range(atts_num):
        temp = list()
        for j in range(atts_num):
            temp.append(cosine_similarity(tf_idf[i:],tf_idf[j:])[0][0])
        scores.append(temp)
    
    return scores
