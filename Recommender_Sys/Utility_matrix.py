from BE.website import extension, database, middleware
import requests
import numpy as np
from sklearn.feature_extraction.text import TfidfTransformer

def MinMax_Scaler(array):
    Max = np.max(array)
    Min = np.min(array)
    array = (array - Min)/(Max - Min)

    return array
def Utility_matrix(attraction):
    attribute = list()
    matrix = np.array([])
    for i in attraction:
        att = i['attribute'].split(', ')
        attribute.extend(att)
    attribute = set(attribute)
    # attribute.remove('')
    
    attribute = list(attribute)

    for i in attraction:
        temp = list()
        # print(i)
        for j in attribute:
            if j in i['attribute']:
                temp.append(1)
            else:
                temp.append(0)
        
        matrix = np.insert(matrix, 0, np.array(temp), axis=0)
        # print(matrix)
    matrix = matrix.reshape(len(attraction), -1)
    return np.flip(matrix, axis=0)

def TF_IDF(matrix):
    transformer = TfidfTransformer(smooth_idf=True, norm ='l2')
    tfidf = transformer.fit_transform(matrix.tolist()).toarray()
    return tfidf

def GetDistance(user, attraction):
    x,y = user
    distance = np.array([])
    for i in attraction:
        # print(i)
        distance = np.insert(distance, 0, (x - float(i['latitude']))**2 + (y - float(i['longitude']))**2, axis=0)

    return MinMax_Scaler(distance[::-1])