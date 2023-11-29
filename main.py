from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta #auth
import json

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/testdbflask'
db = SQLAlchemy(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

# Use app.app_context() to create an application context
with app.app_context():
    # Create the database tables
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test_post', methods=['POST'])
def test_post():
    byte_data = request.data
    #print(request.form)
    string_data = byte_data.decode('utf-8')
    json_request = json.loads(string_data)
    final_result = json_request['username']
    return {"result": [final_result]}

@app.route('/test_post_db', methods=['POST'])
def test_post_db():
    byte_data = request.data
    #print(request.form)
    string_data = byte_data.decode('utf-8')
    json_request = json.loads(string_data)

    # Create a new user instance
    new_user = Users(username=json_request["username"])

    # Add the new user to the database session
    db.session.add(new_user)

    # Commit the changes to the database
    db.session.commit()

    #users = User.query.all()
    return {"result": json_request["username"]+" is added"}

@app.route('/get_users', methods=['GET'])
def get_users():
    # Retrieve all users from the database
    users = Users.query.all()

    # Convert the list of users to a list of dictionaries for JSON response
    users_list = [{'id': user.id, 'username': user.username} for user in users]
    return {"result": users_list}

if __name__ == '__main__':
    app.run(debug=True)