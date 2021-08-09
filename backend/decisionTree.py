import sklearn
import numpy as np
import pandas as pd
import csv

from sklearn.tree import DecisionTreeClassifier
from sklearn import tree

import sys
# sys.modules['sklearn.externals.six'] = six
# from id3 import Id3Estimator
# from id3 import export_graphviz
from sklearn.tree import _tree

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

import pickle

origCluster = pd.read_csv('data/clusterDataNorm.csv', index_col=0)

# removiedNoise = origCluster.groupby('cluster').mean()
# removiedNoise = removiedNoise.applymap(lambda x: 1 if x > 2.5 else 0)
removiedNoise = origCluster
# removiedNoise = removiedNoise.reset_index()
removiedNoise = removiedNoise[removiedNoise.cluster != -1]
# removiedNoise.reset_index()

# removiedNoise.to_csv('removiedNoise.csv')

x = removiedNoise.loc[:, removiedNoise.columns != 'cluster']
x.to_csv('data/x.csv')
# x = ave.loc[:, ave.columns != 'index']
x = x.applymap(lambda x: 1 if x >= 0.90 else 0)

y = pd.DataFrame(removiedNoise['cluster'])

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.20, random_state=42)
# ave_X_train, ave_X_test, ave_y_train, ave_y_test = train_test_split(removiedNoise, removiedNoise, test_size=0.20, random_state=42)

clf = DecisionTreeClassifier(random_state=1234)
clf = clf.fit(X_train, y_train)

text_representation = tree.export_text(clf, feature_names=x.columns.tolist(), max_depth=50)
# print(text_representation)

y_pred = clf.predict(X_test)
print(accuracy_score(y_test, y_pred))

with open("text_representation.txt", "w") as text_file:
    text_file.write(text_representation)

with open('model.pkl','wb') as f:
	pickle.dump(clf, f)


