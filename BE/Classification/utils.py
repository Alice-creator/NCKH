import torch
from torch import nn as nn
from torchvision import models
import os

model_dir = '../BE/Classification/best.pt'
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

def allowed_file(filename):
        return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'jpg', 'png'}

def get_model_instance(num_classes):
    model = models.mobilenet_v2(weights='IMAGENET1K_V1')
    in_features = model.classifier[-1].in_features
    model.classifier[-1] = nn.Linear(in_features, num_classes)
    return model

def load_model(model, model_path):
    if device == 'cuda':
        model.load_state_dict(torch.load(model_path))
    else:
        model.load_state_dict(torch.load(model_path, map_location='cpu'))
    return model
