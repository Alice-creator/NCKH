from flask import *
from flask_restful import Api, Resource
from werkzeug.utils import secure_filename
import os, io
from PIL import Image
from .image_transformer import ImageTransformer
from .utils import *
import numpy as np
from BE.website import extension, database, middleware, Account
import requests
class Classifier(Resource):
    def predict(self, img):
        tf = ImageTransformer((299,299))
        img_tf = tf(img, 'test')
        img = img_tf[None]
        # get num class
        model_class = "D:/Project/NCKH/Model/model_class.json"
        # if not os.path.isfile(model_class):
        #     return None
        # with open(model_class, 'r') as jf:
        #     idx_to_class = json.load(jf)
        # num_classes = len(idx_to_class)
        classes, idx_to_class = get_num_class(model_class)
        # load model
        model = get_model_instance(classes)

        # print(os.path.isfile(model_dir))
        if os.path.isfile(model_dir):
            model = load_model(model, model_dir)
            model.eval().to(device)
        else:
            return None
        # predict
        _, pred = model(img.to(device))
        arg = np.argmax(pred.to(device).detach().numpy())
        softmax = nn.Softmax(dim=1)
        prob = round(torch.max(softmax(pred)).item(),2)
        return {
            'name' : idx_to_class[str(arg)],
            'index': str(arg),
            'prob': str(prob)
        }

    def post(self, language):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        if not auth:
            return {'status' : False,
                    'message': 'you need to login first'
                    }, 401

        file = request.files['file']
        if not file.filename:
            error = "no file uploaded"
            return jsonify({"error": error}), 400
        if file and allowed_file(file.filename):
            data_img = file.read()
            img_obj = io.BytesIO(data_img)
            img = Image.open(img_obj)

            self.saveImg(auth, file.filename, img)

            pred = self.predict(img)
            return jsonify({"result": self.getAttractionInfo(pred, language, request.headers.get('Authorization'))})
        error = 'Allowed file types are png and jpg'
        return jsonify({"error": error})
    
    def saveImg(self, auth, filename, img):
        connection = database.connect_db()
        cursor = connection.cursor()
        img.resize((299,299))
        img.save('D:/Project/NCKH/Image/' + filename)
        cursor.execute(
                '''
                UPDATE user_post_image
                set image_path = %s
                where CID = %s;
                ''',
                ('D:/Project/NCKH/Image/' + filename, auth['CID'],)
            )
        connection.commit()
    
    def getAttractionInfo(self, predict, language, token):
        connection = database.connect_db()
        cursor = connection.cursor()
        # print(int(predict['index']) in range(23, 26))
        if int(predict['index']) in range(23, 26):
            headers = {}
            headers['Authorization'] = token
            # print(requests.get('http://127.0.0.1:5000/' +  language + '/Account/SearchByType/' + predict['name'], headers=headers).json())
            return requests.get('http://127.0.0.1:5000/' +  language + '/Account/SearchByType/' + predict['name'], headers=headers).json()
                
        if language.lower().strip() in 'vietnam':
            cursor.execute(
                '''
                select * from viet_introduction
                where index = %s;
                ''',
                (predict['index'],)
            )
        else:
            cursor.execute(
                '''
                select * from eng_introduction
                where index = %s;
                ''',
                (predict['index'],)
            )
        result = cursor.fetchone()
        middleware.update_Search(result[0])
        return result