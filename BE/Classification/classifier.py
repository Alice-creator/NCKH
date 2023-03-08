from flask import *
from flask_restful import Api, Resource
from werkzeug.utils import secure_filename
import os, io
from PIL import Image
from .image_transformer import ImageTransformer
from .utils import *
import numpy as np

class Classifier(Resource):
    def predict(self, img):
        tf = ImageTransformer((299,299))
        img_tf = tf(img, 'test')
        img = img_tf[None]

        # get num class
        model_class = './model_class.json'
        if not os.path.isfile(model_class):
            return None
        with open(model_class, 'r') as jf:
            idx_to_class = json.load(jf)
        num_classes = len(idx_to_class)

        # load model
        model = get_model_instance(num_classes)
        if os.path.isfile(model_dir):
            model = load_model(model, model_dir)
            model.eval().to(device)
        else:
            return None
        
        # predict
        pred = model(img.to(device))
        arg = np.argmax(pred.to(device).detach().numpy())
        softmax = nn.Softmax(dim=1)
        prob = round(torch.max(softmax(pred)).item(),2)
        return {
            'index': str(arg),
            'prob': str(prob)
        }

    def post(self):
        file = request.files['file']
        if not file.filename:
            error = "no file uploaded"
            return jsonify({"error": error}), 400
        if file and allowed_file(file.filename):
            data = file.read()
            img_obj = io.BytesIO(data)
            img = Image.open(img_obj)
            print(img)
            pred = self.predict(img)
            return jsonify({"result": pred})
        error = 'Allowed file types are png and jpg'
        return jsonify({"error": error})
