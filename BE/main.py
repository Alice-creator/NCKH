from flask import Flask
from flask_restful import Api
from website import Account, User, Admin, Attraction
from Classification import classifier
app = Flask(__name__)
api = Api(app)
# Attraction.insertAttraction()
api.add_resource(Account.SignUp, '/Account/sign-up')
api.add_resource(Account.Login, '/Account/login')
api.add_resource(User.Storage, '/User/storage')
api.add_resource(User.Bonus, '/User/bonus')
api.add_resource(Account.ChangeInfo, '/Account/<string:CID>')
api.add_resource(Admin.UserInfo, '/Admin/UserInfo')
api.add_resource(Admin.UserInfoDetail, '/Admin/UserInfo/<string:CID>')
api.add_resource(classifier.Classifier, '/AI/FindingPlace') 
api.add_resource(User.GetImg, '/User/JustPostedImg/<string:CID>')
if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0')
