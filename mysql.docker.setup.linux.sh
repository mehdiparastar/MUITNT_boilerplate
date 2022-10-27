#!/bin/bash

input="./server/.development.env"
MYSQL_PASSWORD="admin"
MYSQL_USER="admin"

while IFS= read -r line; do
    eval $line
    MYSQL_DATABASE="$DB_NAME"    
done <"$input"

input="./server/.test.env"
while IFS= read -r line; do
    eval $line
    MYSQL_TEST_DATABASE="$DB_NAME"    
done <"$input"

create_dev_user="CREATE USER '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';\n"
admin_user_privileges_localhost_to_dev_db="GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%';\n"
admin_user_privileges_localhost_to_test_db="GRANT ALL PRIVILEGES ON ${MYSQL_TEST_DATABASE}.* TO '${MYSQL_USER}'@'%';\n\n"
USER_SQL="${create_dev_user}${admin_user_privileges_localhost_to_dev_db}${admin_user_privileges_localhost_to_test_db}"
echo ${USER_SQL} >./server/docker_mysql_init/init/01-users.sql

create_test_db="CREATE DATABASE IF NOT EXISTS ${MYSQL_TEST_DATABASE};\n"
DB_SQL="${create_test_db}"
echo ${DB_SQL} >./server/docker_mysql_init/init/02-databases.sql

l01="version: '3.8'\n"
l02="services:\n"
l03='\tdb:\n'
l04="\t\tcontainer_name: mysqlcontainer\n"
l05="\t\timage: mysql\n"
l06="\t\tenvironment:\n"
l07="\t\t\t- MYSQL_ROOT_PASSWORD=password\n"
l08="\t\t\t- MYSQL_DATABASE=${MYSQL_DATABASE}\n"
l09="\t\t\t- MYSQL_USER=${MYSQL_USER}\n"
l10="\t\t\t- MYSQL_PASSWORD=${MYSQL_PASSWORD}\n"
l11="\t\tcommand: --default-authentication-plugin=mysql_native_password\n"
l12="\t\trestart: always\n"
l13="\t\tports:\n"
l14="\t\t\t- 3306:3306\n"
l15="\t\tvolumes:\n"
l16="\t\t\t- db:/var/lib/mysql\n"
l17="\t\t\t- ./init:/docker-entrypoint-initdb.d\n"
l18="\t\texpose:\n"
l19="\t\t\t- 3306\n"
l20="\t\tnetworks:\n"
l21="\t\t\t- mysql_dev_db_network\n"
l22="\n"
l23="volumes:\n"
l24="\tdb:\n"
l25="\t\tdriver: local\n"
l26="\n"
l27="networks:\n"
l28="\tmysql_dev_db_network:\n"
l29="\t\tdriver: bridge\n"
l30=""
l31=""
docker_compose="${l01}${l02}${l03}${l04}${l05}${l06}${l07}${l08}${l09}${l10}${l11}${l12}${l13}${l14}${l15}${l16}${l17}${l18}${l19}${l20}${l21}${l22}${l23}${l24}${l25}${l26}${l27}${l28}${l29}${l30}${l31}"

echo ${docker_compose} >./server/docker_mysql_init/docker-compose-mysql-only.yml

sleep 2
sed -i 's/\t/  /g' ./server/docker_mysql_init/docker-compose-mysql-only.yml
sleep 2

docker-compose -f ./server/docker_mysql_init/docker-compose-mysql-only.yml down
docker container prune -f
docker volume prune -f
docker system prune -f
sleep 2
docker-compose -f ./server/docker_mysql_init/docker-compose-mysql-only.yml up --build -d

echo bye
sleep 2
