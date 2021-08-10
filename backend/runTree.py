import numpy as np
import pandas as pd

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
from flask_cors import CORS, cross_origin


import json
import random

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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

@app.route('/requestRoot', methods=['GET'])
@cross_origin()
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
    clusterRec = oddsRatio[oddsRatio['cluster'] == int(cluster)].sort_values(by=['odds_ratio'], ascending=False)
    movieRec = clusterRec.iloc[[0]]['movieId']

    tmdb = links[links['movieId'] == int(movieRec)]
    return jsonify(
        tmdbId=int(tmdb['tmdbId'].item()),
        imdbId=tmdb['imdbId'].item(),
        url='https://www.themoviedb.org/movie/' + str(int(tmdb['tmdbId'].item())),
        )

@app.route('/requestMovie/<cluster>/<position>')
def request_movie_position(cluster, position):
    clusterRec = oddsRatio[oddsRatio['cluster'] == int(cluster)].sort_values(by=['odds_ratio'], ascending=False)
    clusterRec = clusterRec[clusterRec['odds_ratio'] > 1]
    numMovies = len(clusterRec.index)
    position = int(position)
    if position < numMovies:
        movieRec = clusterRec.iloc[[position]]['movieId']
    else:
        return "Out of Recommendations"

    tmdb = links[links['movieId'] == int(movieRec)]
    return jsonify(
        tmdbId=int(tmdb['tmdbId'].item()),
        imdbId=tmdb['imdbId'].item(),
        url='https://www.themoviedb.org/movie/' + str(int(tmdb['tmdbId'].item())),
        numMovies=numMovies,
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

@app.route('/requestMovieByGenre/<genre>/<amount>')
def request_movie_by_genre(genre, amount):
    genre = str(genre).lower()
    amount = int(amount)
    
    movieG = movieData
    movieG['genres'] = movieG['genres'].apply(lambda x: x.lower())
    movieG = movieG[movieG['genres'].str.contains(genre)]

    numMovies = len(movieG['genres'])

    print(numMovies)
    movieG = movieG.sort_values(by='vote_average', ascending=False)

    top10Range = int(round(numMovies / 5))
    
    if amount > top10Range:
        top10Range = numMovies - 1

    if amount > top10Range:
        return "Not enough movies for this genre"

    indexes = random.sample(range(0, top10Range), amount)

    tmdbIds = []

    for i in indexes:
        row = movieG.iloc[[i]]
        movieId = row.iloc[0]['imdb_id']
        movieId = int(movieId[2:])
        tmdb = links.loc[links['imdbId'] == movieId]
        tmdbIds.append(tmdb.iloc[0]['tmdbId'])

    my_dict = dict() 
    for index,value in enumerate(tmdbIds):
        my_dict[index] = int(value)
    # print(my_dict)
    # print(indexes)
    # return indexes


    return jsonify(my_dict)
    return "y"

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
    oddsRatio = pd.read_csv('data/oddsRatio.csv', index_col=0)
    oddsRatio = oddsRatio.dropna()

    links = pd.read_csv('data/links.csv')

    tree_ = clf.tree_
    feature_name = [
        feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
        for i in tree_.feature
    ]

    treeNodes = treeToJson(tree_, feature_name)

    movieData = pd.read_csv('data/movieData.csv', index_col=0)

    app.run()
