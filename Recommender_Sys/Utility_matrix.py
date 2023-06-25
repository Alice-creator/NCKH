from BE.website import extension, database, middleware
import requests
def Utility_matrix():
    data = requests.get('http://127.0.0.1:5000/Dev/Analyse').json()
    return data