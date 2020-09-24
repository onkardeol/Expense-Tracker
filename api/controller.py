from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'expenses_db'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/expenses_db'

mongo = PyMongo(app)

@app.route('/expenses', methods=['GET'])
def get_all_expenses():
    expenses = mongo.db.expenses
    output = []

    for expense in expenses.find():
        output.append({'id': str(expense['_id']), 'name': expense['name'], 'cost': expense['cost'], 'category': expense['category']})

    return jsonify({'result': output})

@app.route('/expenses', methods=['POST'])
def create_expense():
    expenses = mongo.db.expenses

    name = request.json['name']
    cost = request.json['cost']
    category = request.json['category']
    print("Name: ", name, " Cost: ", cost, " Category: ", category)

    expense_id = expenses.insert_one({'name': name, 'cost': cost, 'category': category})
    new_expense = expenses.find_one({'_id': expense_id.inserted_id})
    output = {'id': str(new_expense['_id']), 'name': new_expense['name'], 'cost': new_expense['cost'], 'category': new_expense['category']}

    return jsonify({'result': output})

@app.route('/expenses/<id>', methods=['DELETE'])
def delete_expense(id):
    expenses = mongo.db.expenses

    # name = request.json['name']
    # cost = request.json['cost']
    # category = request.json['category']
    print(id)

    expense_id = expenses.delete_one({'_id': ObjectId(id)})

    return jsonify({'result': "success"})

if __name__ == '__main__':
    app.run(debug=False)