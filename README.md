# POS-Restaurant

 Point of Sale

## Runtime requiriments
  nodejs  8.x
  
## Install dependencies
  npm install

## Run migrations, create database and tables
  npm migrate

## Run app 
  npm start
  navigate http://localhost:3000

## Run docker postgres image
  * using services
    * sudo docker swarm init 
      * create services
        * sudo docker stack deploy -c stack.yml up 
  * using docker-compose
    * docker-compose -f stack.yml up

  * list docker services
    * docker ls
  * remove docker service 
    * docker service rm <service_name>

## Database administration
    * using Adminer
      * admin database http://localhost:8080/
        * user: postgress
        * pass: admin
## Docker images and containers
  * Delete all containers
    * sudo docker rm $(sudo docker ps -a -q)
  * Delete all images
    *docker rmi -f $(docker images -q)
  
## Create environment variable for postgres
  * export DATABASE_URL=postgres://postgres:admin@localhost:5432/postgres