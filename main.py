from flask import Flask, render_template
from datetime import timedelta #auth
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Optional
import db.models
from db.database import engine, SessionLocal

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)