import torch
from torch import nn as nn
from torchvision import models
import os
import json
from .inception import InceptionV3

model_dir = '../BE/Classification/best.pt'
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

def allowed_file(filename):
        return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'jpg', 'png'}

# def get_model_instance(num_classes):
#     model = models.mobilenet_v2(weights='IMAGENET1K_V1')
#     in_features = model.classifier[-1].in_features
#     model.classifier[-1] = nn.Linear(in_features, num_classes)
#     return model

def get_model_instance(num_classes):
    model = models.inception_v3(weights='IMAGENET1K_V1')
    model.add_module('layer1', nn.Linear(2048, num_classes[0]))
    model.add_module('layer2', nn.Linear(2048, num_classes[1]))
    model = InceptionV3(model, num_classes)
    return model

def load_model(model, model_path):
    if device == 'cuda':
        model.load_state_dict(torch.load(model_path))
    else:
        model.load_state_dict(torch.load(model_path, map_location='cpu'))
    return model

def get_num_class(filepath):
    if not os.path.isfile(filepath):
        return None
    with open(filepath, 'r') as jf:
        file = json.load(jf)

    file = dict(file)
    s = 0
    idx_to_class = {}
    for i in file:
        d = dict(file[i])
        key = list(d.keys())[0]
        s += len(d[key])
        idx_to_class.update(d[key])
    return [len(file), s], idx_to_class

