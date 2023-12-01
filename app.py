from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger
import flask_migrate
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta #auth
import json

app = Flask(__name__, static_url_path='/static', static_folder='static')

# Create a Swagger object
swagger = Swagger(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/testdbflask'
app.config['SECRET_KEY'] = 'any_String'
db = SQLAlchemy(app)

migrate = flask_migrate.Migrate(app, db)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    password = db.Column(db.String(255), default="password", unique=False, nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    item_type_enum = db.Column(db.Integer, default=0, nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Specify the custom table name
    __tablename__ = 'items'

# Use app.app_context() to create an application context
with app.app_context():
    # Create the database tables
    db.create_all()

@app.route('/', methods=['GET'])
def home():
    """
    This is the docstring for the index route.

    It provides information about the GET method.
    ---
    responses:
      200:
        description: Successful response
    """
    return render_template('index.html')

@app.route('/item_adder', methods=['GET'])
def item_adder():
    """
    This is the docstring for the add item
    ---
    responses:
      200:
        description: Successful response
    """
    return render_template('item_adder.html')

@app.route('/test_post', methods=['POST'])
def test_post():
    """
    This is the docstring for the request
    ---
    parameters:
      - name: body
        in: body
        description: JSON body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
    responses:
      200:
        description: {"result": [final_result]}
    """
    byte_data = request.data
    #print(request.form)
    string_data = byte_data.decode('utf-8')
    json_request = json.loads(string_data)
    final_result = json_request['username']
    return {"result": [final_result]}

@app.route('/test_post_db', methods=['POST'])
def test_post_db():
    """
    This is the docstring for the request
    ---
    parameters:
      - name: body
        in: body
        description: JSON body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
            password:
              type: string
    responses:
      200:
        description: ...
    """
    byte_data = request.data
    #print(request.form)
    string_data = byte_data.decode('utf-8')
    json_request = json.loads(string_data)

    # Create a new user instance
    new_user = Users(username=json_request["username"])
    new_user.set_password(json_request["password"])

    # Add the new user to the database session
    db.session.add(new_user)

    # Commit the changes to the database
    db.session.commit()

    #users = User.query.all()
    return {"result": json_request["username"]+" is added"}

@app.route('/get_users', methods=['GET'])
def get_users():
    """
    This is the docstring for the request
    ---
    responses:
      200:
        description: ...
    """
    # Retrieve all users from the database
    users = Users.query.all()

    # Convert the list of users to a list of dictionaries for JSON response
    users_list = [{'id': user.id, 'username': user.username} for user in users]
    return {"result": users_list}

@app.route('/get_users_ids', methods=['GET'])
def get_users_ids():
    """
    This is the docstring for the request
    ---
    responses:
      200:
        description: ...
    """
    # Retrieve only the 'id' column from the Users table
    user_ids = Users.query.with_entities(Users.id).all()

    # Convert the list of tuples to a list of integers for JSON response
    id_list = [user_id[0] for user_id in user_ids]
    return {"result": id_list}

@app.route('/test_add_item', methods=['POST'])
def test_add_item():
    """
    This is the docstring for the request
    ---
    parameters:
      - name: body
        in: body
        description: JSON body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
    responses:
      200:
        description: ...
    """
    byte_data = request.data
    #print(request.form)
    string_data = byte_data.decode('utf-8')
    json_request = json.loads(string_data)

    new_item = Items(name=json_request["name"], user_id=int(json_request["user_id"]))

    # Add the new user to the database session
    db.session.add(new_item)

    # Commit the changes to the database
    db.session.commit()

    #users = User.query.all()
    return {"result": json_request["name"]+" is added"}

if __name__ == '__main__':
    app.run(debug=True)