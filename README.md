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

To change database without data loss, make some new "nullable" columns into the models and then in command line (same directory) :

0. (make sure the main app file is named app.py)
1. flask db init (first time only)
2. flask db migrate -m "string"
3. flask db upgrade

Make sure to keep the migration folder alive, because every upgrade will check previous versions everytime.
If previosu versions not found, go to table "alembic_version" and delete all rows there (or speficic rows)

- DELETE FROM alembic_version WHERE version_num = 'version_id';