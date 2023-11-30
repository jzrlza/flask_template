# flask_template

before running :
in console/terminal/command prompt of the project's directory : 

1. pip install -r requirement.txt

to run :

in console/terminal/command prompt of the project's directory : 

2. python app.py

Then visit http://localhost:5000/ (index.html is default)

http://localhost:5000/apidocs for docs (may not as accurate as FastAPI's)

-------------------

To change database without data loss, make a new "nullable" columns into the models and then in command line (same directory) :
(make sure the main app file is named app.py)
1. flask db init
2. flask db migrate -m "string"
3. flask db upgrade
4. And then now then delete the migration/ folder in there everytime you finishes
