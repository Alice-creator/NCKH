import numpy as np
from sklearn.linear_model import Ridge

def train(Utility_matrix, rating, users_list, atts_list):
    d = Utility_matrix.shape[1]
    w = list()
    b = list()

    for i in users_list:
        x = list()
        y = list()
        for j in rating:
            print(i, j)
            if i == j[1]:
                x.append(Utility_matrix[atts_list.index(j[0])])
                y.append(j[2])
        X = np.array(x)
        Y = np.array(y)
        clf = Ridge(alpha=0.001, fit_intercept=True, max_iter=1000, positive=True)
        clf.fit(X,Y)
        w.append(clf.coef_)
        b.append(clf.intercept_)
    
    w = np.array(w).T
    b = np.array(b)
    predict = Utility_matrix.dot(w) + b
    return predict