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

import json

app = Flask(__name__)

class Node:
    def __init__(self, id, leftChild, rightChild, feature):
        self.id = id
        self.leftChild = leftChild
        self.rightChild = rightChild
        self.feature = feature



    def serialize(self):
        return {
            'id': int(self.id), 
            'leftChild': int(self.leftChild),
            'rightChild': int(self.rightChild),
            'feature': str(self.feature),
        }

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

@app.route('/requestTree')
def request_tree():
    return jsonify(tree=[e.serialize() for e in treeNodes])

@app.route('/requestNode/<node>')
def request_node(node):
    node = int(node)

    probList = tree_.value[node][0].tolist()
    prob = max(probList) / sum(probList)

    if tree_.feature[node] != _tree.TREE_UNDEFINED:
        return jsonify(
            node=int(node),
            cluster=next((i for i, x in enumerate(tree_.value[node].flatten().tolist()) if x)),
            feature=feature_name[node],
            probability=prob,
            isLeaf=False,
        )
    return jsonify(
            node=int(node),
            cluster=next((i for i, x in enumerate(tree_.value[node].flatten().tolist()) if x)),
            isLeaf=True,
            probability=prob,
        )

def treeToJson(tree_, feature_name):
    treeNodes = []

    def recurse(node, depth):
        if tree_.feature[node] != _tree.TREE_UNDEFINED:
            name = feature_name[node]
            threshold = tree_.threshold[node]
            treeNodes.append(Node(node, tree_.children_left[node], tree_.children_right[node], name))
            recurse(tree_.children_left[node], depth + 1)
            recurse(tree_.children_right[node], depth + 1)
        else:
            treeNodes.append(Node(node, -1, -1, -1))
    recurse(0, 1)
    return treeNodes

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

    treeNodes = treeToJson(tree_, feature_name)

    app.run()
