from flask import Flask
from flask_restful import Api
from BE.website import *
from Model import classifier
app = Flask(__name__)
api = Api(app)

api.add_resource(Account.SignUp, '/Account/sign-up')
api.add_resource(Account.Login, '/Account/login')
api.add_resource(User.Storage, '/<string:language>/User/storage')
api.add_resource(User.Feedback, '/Account/feedback')
api.add_resource(Account.ChangeInfo, '/Account/changeinfo')
api.add_resource(Admin.UserInfo, '/Admin/UserInfo')
api.add_resource(Admin.UserInfoDetail, '/Admin/UserInfo/<string:CID>')
api.add_resource(classifier.Classifier, '/<string:language>/FindingPlace') 
api.add_resource(User.GetImg, '/User/JustPostedImg/<string:CID>')
api.add_resource(Admin.Attractions, '/Admin/Attractions')
api.add_resource(Account.SearchByType, '/<string:language>/Account/SearchByType/<string:searchType>')
api.add_resource(Account.ExternalSearch, '/<string:language>/Account/Searchapi/<string:key>')
api.add_resource(Dev.RootAttraction, '/Dev/RootAttraction')
api.add_resource(Dev.Analyse, '/Dev/Analyse')
if __name__ == '__main__':
    app.run(debug = True)
