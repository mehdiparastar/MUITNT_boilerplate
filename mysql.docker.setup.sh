#!/bin/bash

input="./server/.development.env"
while IFS= read -r line;
do 
    eval $line;
    MYSQL_DATABASE="$DB_NAME"
    MYSQL_PASSWORD="$DB_PASS"
    MYSQL_USER="$DB_USER"
done< "$input"

input="./server/.test.env"
while IFS= read -r line;
do 
    eval $line;
    MYSQL_TEST_DATABASE="$DB_NAME"
    MYSQL_TEST_PASSWORD="$DB_PASS"
    MYSQL_TEST_USER="$DB_USER"
done< "$input"

create_dev_user="CREATE USER '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';\n"
dev_user_privileges="GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'localhost';\n\n"
create_test_user="CREATE USER '${MYSQL_TEST_USER}'@'localhost' IDENTIFIED BY '${MYSQL_TEST_PASSWORD}';\n"
test_user_privileges="GRANT ALL PRIVILEGES ON ${MYSQL_TEST_DATABASE}.* TO '${MYSQL_TEST_USER}'@'localhost';\n"
USER_SQL="${create_dev_user}${dev_user_privileges}${create_test_user}${test_user_privileges}"
echo ${USER_SQL} > ./server/docker_mysql_init/01-users.sql


create_test_db="CREATE DATABASE IF NOT EXISTS '${MYSQL_TEST_DATABASE}';\n"
DB_SQL="${create_test_db}"
echo ${DB_SQL} > ./server/docker_mysql_init/02-databases.sql

docker_compose="mehdi"
echo ${docker_compose} > ./server/docker_mysql_init/docker-compose-mysql-only.yml
