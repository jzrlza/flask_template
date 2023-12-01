DATA_PATH="/home/mynameuser/projname-data"
CONTAINER_PATH="/var/lib/postgresql/data" #make sure it is this path
docker stop flask_template_db
docker rm flask_template_db
docker run -p 127.0.0.1:5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=testdbflask --name flask_template_db -v $DATA_PATH:$CONTAINER_PATH -d postgres

#this made it worked
#sudo chown -R 70:70 /home/mynameuser/projname-data