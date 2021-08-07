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

import pickle

from flask import Flask
from flask import jsonify

import webbrowser

app = Flask(__name__)


@app.route('/')
def hello_world():
   return 'Hello World'

@app.route('/requestRoot')
def request_root():
    return jsonify(
        node=0,
        feature=feature_name[0],
    )

@app.route('/requestLeft/<node>')
def request_left(node):
    childsNode = int(tree_.children_left[int(node)])

    probList = tree_.value[childsNode][0].tolist()
    prob = max(probList) / sum(probList)

    if tree_.feature[childsNode] != _tree.TREE_UNDEFINED:
        return jsonify(
            node=int(childsNode),
            cluster=next((i for i, x in enumerate(tree_.value[childsNode].flatten().tolist()) if x)),
            feature=feature_name[childsNode],
            probability=prob,
            isLeaf=False,
        )
    return jsonify(
            node=int(childsNode),
            cluster=next((i for i, x in enumerate(tree_.value[childsNode].flatten().tolist()) if x)),
            isLeaf=True,
            probability=prob,
        )

@app.route('/requestRight/<node>')
def request_right(node):
    childsNode = int(tree_.children_right[int(node)])

    probList = tree_.value[childsNode][0].tolist()
    prob = max(probList) / sum(probList)

    if tree_.feature[childsNode] != _tree.TREE_UNDEFINED:
        return jsonify(
            node=int(childsNode),
            cluster=next((i for i, x in enumerate(tree_.value[childsNode].flatten().tolist()) if x)),
            feature=feature_name[childsNode],
            probability=prob,
            isLeaf=False,
        )
    return jsonify(
            node=int(childsNode),
            cluster=next((i for i, x in enumerate(tree_.value[childsNode].flatten().tolist()) if x)),
            isLeaf=True,
            probability=prob,
        )

@app.route('/requestMovie/<cluster>')
def request_movie(cluster):
    tmdb = links[links['movieId'] == clusterRecs.iloc[int(cluster)]['top1']]
    return jsonify(
        tmdbId=int(tmdb['tmdbId'].item()),
        imdbId=tmdb['imdbId'].item(),
        url='https://www.themoviedb.org/movie/' + str(int(tmdb['tmdbId'].item())),
        )

@app.route('/requestProb/<node>')
def request_prob(node):
    return jsonify(
        probability=probs[int(node)],
        )

if __name__ == '__main__':
    with open('model.pkl', 'rb') as f:
        clf = pickle.load(f)

    feature_names = pd.read_csv('data/x.csv', index_col=0).columns.tolist()

    # find movie suggestion
    clusterRecs = pd.read_csv('data/clusterRec.csv', index_col=0)
    links = pd.read_csv('data/links.csv')

    tree_ = clf.tree_
    feature_name = [
        feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
        for i in tree_.feature
    ]

    samples = tree_.n_node_samples
    class1_positives = tree_.value[:,0,1]
    probs = (class1_positives/samples).tolist()
    print(probs)
    app.run()
