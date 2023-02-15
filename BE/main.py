from flask import Flask
from flask_restful import Api
from website import Account, User, Admin
from classifier import Classifier
app = Flask(__name__)
api = Api(app)

api.add_resource(Account.SignUp, '/Account/sign-up')
api.add_resource(Account.Login, '/Account/login')
api.add_resource(User.Storage, '/User/storage')
api.add_resource(User.Bonus, '/User/bonus')
api.add_resource(Account.ChangeInfo, '/Account/<string:CID>')
api.add_resource(Admin.UserInfo, '/Admin/UserInfo')
api.add_resource(Admin.UserInfoDetail, '/Admin/UserInfo/<string:CID>')
if __name__ == '__main__':
    app.run(debug = True)
