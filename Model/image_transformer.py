import torch
from torchvision import transforms

class ImageTransformer:
    def __init__(self, size):
        self.data_transform = {
            'train': transforms.Compose([
                # transforms.RandomRotation(10),
                transforms.Resize(size=size),
                transforms.ToTensor()
            ]),
            'test': transforms.Compose([
                transforms.ToTensor(),
                transforms.Resize(size=size)
            ])
        }
    def __call__(self, img, mode='train'):
        return self.data_transform[mode](img)