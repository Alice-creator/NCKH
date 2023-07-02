import random

class Genetic():
    def __init__(self, geneticRate=0.05, parentNum=20, num_iter=300, stuffList=None, stuffName=None):
        self.geneticRate = geneticRate
        self.parentNum = parentNum
        self.num_iter = num_iter
        self.stuffList = stuffList
        self.stuffName = stuffName
        self.bestConfig = None
        self.parentList = list()
    
    def score(self, i):
        try:
            return self.stuffList[i][i+1]
        except:
            return 1000

    def fit(self):
        if self.stuffList and self.stuffName:
            self.generateParent()

            for _ in range(self.num_iter):
                self.rejectParent()
                self.crossover()
    
        return self.bestConfig

    def generateParent(self):
        for _ in range(20):
            self.parentList.append(random.shuffle(self.stuffName, len(self.stuffName)))
    
    def rejectParent(self):
        self.parentList.sort(key=self.score(), reverse=True)
        self.parentList = self.parentList[:len(self.parentList)/2]
    
    def crossover(self):
        newParentList = list()
        while len(self.parentList) > 0:
            parent1 = self.parentList[0]
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
    