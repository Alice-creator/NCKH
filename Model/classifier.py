from flask import *
from flask_restful import Api, Resource
from werkzeug.utils import secure_filename
import os, io
from PIL import Image
from .image_transformer import ImageTransformer
from .utils import *
import numpy as np
from BE.website import extension, database, middleware
import requests
model_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'best.pt')

class Classifier(Resource):
    def predict(self, img):
        tf = ImageTransformer((299,299))
        img_tf = tf(img, 'test')
        img = img_tf[None]
        # get num class
        model_class = os.path.join(os.getcwd(), 'Model\model_class.json')
        classes, idx_to_class = get_num_class(model_class)
        # load model
        model = get_model_instance(classes)
        if os.path.isfile(model_dir):
            model = load_model(model, model_dir)
            
            model.eval().to(device)
        else:
            return None
        # predict
        # _, pred = model(img.to(device))
        # arg = np.argmax(pred.to(device).detach().numpy())
        # softmax = nn.Softmax(dim=1)
        # prob = round(torch.max(softmax(pred)).item(),2)
        _, pred = model(img.to(device))
        pred_np = np.array(pred.to('cpu').detach().numpy()[0])
        softmax = nn.Softmax(dim=1)
        pred_sm = np.array(softmax(pred).to('cpu').detach().numpy()[0])
        args = pred_np.argsort()[-5:][::-1]
        result = [
            {
                'index': args[0],
                'name': idx_to_class[str(args[0])],
                'prob': pred_sm[args[0]]
            },
        ]
        print(idx_to_class, pred_sm)
        for arg in args[1:]:
            if pred_sm[arg] >= 0.7:
                obj = {
                    'index': arg,
                    'name': idx_to_class[str(arg)],
                    'prob': pred_sm[arg]
                }
                result.append(obj)
        
        return result

    def post(self, language):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        # if not auth:
        #     return {'status' : False,
        #             'message': 'you need to login first'
        #             }, 401

        file = request.files['file']
        if not file.filename:
            error = "no file uploaded"
            return jsonify({"error": error}), 400
        if file and allowed_file(file.filename):
            data_img = file.read()
            img_obj = io.BytesIO(data_img)
            img = Image.open(img_obj)

            # self.saveImg(auth, file.filename, img)
            pred = self.predict(img)
            result = self.getAttractionInfo(pred, language, request.headers.get('Authorization'))
            return jsonify({"result": result, "prob": str(pred[0]['prob'])})
        error = 'Allowed file types are png and jpg'
        return jsonify({"error": error})
    
    def saveImg(self, auth, filename, img):
        connection = database.connect_db()
        cursor = connection.cursor()
        img.resize((299,299))
        img.save(os.path.join(os.getcwd(), 'Image', filename))
        cursor.execute(
                '''
                UPDATE user_post_image
                set image_path = %s
                where CID = %s;
                ''',
                (os.path.join(os.getcwd(), 'Image', filename), auth['CID'],)
            )
        connection.commit()
    
    def getAttractionInfo(self, predict, language, token):
        print("pre", predict)
        connection = database.connect_db()
        cursor = connection.cursor()
        
        if int(predict[0]['index']) in range(0, 6):
            headers = {}
            headers['Authorization'] = token
            print('http://127.0.0.1:5000/' +  language + '/Account/SearchByType/' + predict[0]['name'])
            return requests.get('http://127.0.0.1:5000/' +  language + '/Account/SearchByType/' + predict[0]['name'], headers=headers).json()
            
        if language.lower().strip() in 'vi':
            cursor.execute(
                '''
                select viet_introduction.tid, viet_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                from viet_introduction, attractions
                where viet_introduction.index = %s and viet_introduction.tid = attractions.tid;
                ''',
                (str(predict[0]['index']),)
            )
        else:
            cursor.execute(
                '''
                select eng_introduction.tid, eng_introduction.name, latitude, longitude, timezone, location_string, images, address, description, story, likes
                from eng_introduction, attractions
                where eng_introduction.index = %s and eng_introduction.tid = attractions.tid;
                ''',
                (str(predict[0]['index']),)
            )
        result = cursor.fetchone()
        col_name = ['TID', 'name', 'latitude', 'longitude', 'timezone', 'location_string', 'images', 'address', 'description', 'story', 'likes']
        
        token = token.split(' ')[1]
        auth = middleware.authentication(token)
        if not auth:
            auth = { 'CID': 'CID000' }
        middleware.update_Search(result[0], auth['CID'])
        return middleware.toDict(key=col_name, value=[result])