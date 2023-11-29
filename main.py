from flask import Flask, render_template, request
from datetime import timedelta #auth
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Optional
import db.models
from db.database import engine, SessionLocal
import json

app = Flask(__name__, static_url_path='/static', static_folder='static')

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

if __name__ == '__main__':
    app.run(debug=True)