DATA_PATH="/home/mynameuser/records"
CONTAINER_PATH="/pgdata"
docker stop test_flask_app
docker rm test_flask_app
docker run -d --name test_flask_app --network="host" -v $DATA_PATH:$CONTAINER_PATH test_flask python app.py --host 0.0.0.0 --port 8000

#docker run -p 8000:8000 my-flask-app