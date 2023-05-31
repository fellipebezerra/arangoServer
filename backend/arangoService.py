from flask import Flask, request, jsonify
from flask_cors import CORS
from pyArango.connection import *
from pyArango.collection import Collection, Edges, Field
from pyArango.graph import Graph, EdgeDefinition

app = Flask(__name__)
CORS(app, resources={r"/users/*": {"origins": "http://localhost:4200"}})

conn = Connection(username="root", password="root")

db = conn["_system"]

class Users(Collection):
    _fields = {
        "name": Field(),
        "email": Field()
    }

if not db.hasCollection('Users'):
    db.createCollection('Users')

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = db["Users"].createDocument()
    new_user["name"] = data['name']
    new_user["email"] = data['email']
    new_user.save()
    return jsonify(new_user.getStore()), 201

@app.route('/users', methods=['GET'])
def get_users():
    users = [doc.getStore() for doc in db["Users"].fetchAll()]
    return jsonify(users), 200

@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = db["Users"][user_id].getStore()
    return jsonify(user), 200

@app.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = db["Users"][user_id]
    user["name"] = data['name']
    user["email"] = data['email']
    user.save()
    return jsonify(user.getStore()), 200

@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    db["Users"][user_id].delete()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
