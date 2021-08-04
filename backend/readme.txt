Setting Up:

pip install -r requirements.txt (Preferably in a virtual environment)
python runTree.py

Endpoints:

/requestRoot - Returns the node number and the feature(genre) for the root node.

/requestLeft/<node> - Takes in a node and returns the information (node number, feature(genre), isLeaf=False) for the left child of the node. If it's a leaf however it returns (node number, cluster, isLeaf=True).

/requestRight/<node> - Same as requestLeft but for the right child.

/requestMovie/<cluster> - Takes in a cluster and returns a string link to the movie.


Logic for Frontend:

Start by requesting the root node. Ask the user if they like the genre that is given alongside the root node.

(a)
If they do,
    Request the right child, pass in the node number of the current node. 
    Check if the requested right child is a leaf using the isLeaf boolean.
    If yes,
        Pass the returned cluster into the requestMovie endpoint. The suggested movie is returned.
    If no,
        Ask the user if they like the genre that is given alongside the requested node. Repeat from (a)

If they don't,
    Repeat (a) but with left child.
