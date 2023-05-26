import torch
from torch import nn as nn

class InceptionV3(nn.Module):
    def __init__(self, base, num_classes=1000, kernel_size=3):
        super(InceptionV3, self).__init__()
        
        self.c2d_1a_3x3 = base.Conv2d_1a_3x3
        self.c2d_2a_3x3 = base.Conv2d_2a_3x3
        self.c2d_2b_3x3 = base.Conv2d_2b_3x3
        self.maxpool1 = base.maxpool1
        self.c2d_3b_1x1 = base.Conv2d_3b_1x1
        self.c2d_4a_3x3 = base.Conv2d_4a_3x3
        self.maxpool2 = base.maxpool2
        self.mixed1 = base.Mixed_5b
        self.mixed2 = base.Mixed_5c
        self.mixed3 = base.Mixed_5d
        self.mixed4 = base.Mixed_6a
        self.mixed5 = base.Mixed_6b
        self.mixed6 = base.Mixed_6c
        self.mixed7 = base.Mixed_6d
        self.mixed8 = base.Mixed_6e
        self.aux = base.AuxLogits
        self.mixed9 = base.Mixed_7a
        self.mixed10 = base.Mixed_7b
        self.mixed11 = base.Mixed_7c
        self.avg = base.avgpool
        self.drop = base.dropout

        self.layer1 = base.layer1
        self.layer2 = base.layer2
        self.softmax_layer1 = nn.Linear(num_classes[0], num_classes[0])
        self.softmax_layer2 = nn.Linear(num_classes[0]+num_classes[1], num_classes[1])

    def forward(self, x):
        x = self.maxpool1(self.c2d_2b_3x3(self.c2d_2a_3x3((self.c2d_1a_3x3(x)))))
        x = self.maxpool2(self.c2d_4a_3x3(self.c2d_3b_1x1(x)))
        x = self.mixed8(self.mixed7(self.mixed6(self.mixed5(self.mixed4(self.mixed3(self.mixed2(self.mixed1(x))))))))
        # x = self.aux(x)
        x = self.mixed11(self.mixed10(self.mixed9(x)))
        x = self.drop(self.avg(x))
        x = nn.Flatten()(x)
        super_level = self.softmax_layer1(self.layer1(x))
        sub_level = self.softmax_layer2(torch.cat((super_level, self.layer2(x)), dim=1))
        return super_level, sub_level