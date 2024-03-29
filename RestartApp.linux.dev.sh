#!/bin/bash

mkdir "./server/docker_mysql_init"

sleep 2

mkdir "./server/docker_mysql_init/init"

sleep 2

input="./server/.development.env"
while IFS= read -r line; do
  eval $line
  MYSQL_DATABASE="$DB_NAME"
  MYSQL_DEV_PASSWORD="$MYSQL_DEV_PASSWORD"
  MYSQL_DEV_USER="$MYSQL_DEV_USER"
  MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD"
  DEV_SERVER_PORT="$SERVER_PORT"
  DEV_NMS_HTTP_PORT="$NMS_HTTP_PORT"
  DEV_NMS_RTMP_PORT="$NMS_RTMP_PORT"
done <"$input"

input="./server/.test.env"
while IFS= read -r line; do
  eval $line
  MYSQL_TEST_DATABASE="$DB_NAME"
  MYSQL_TEST_PASSWORD="$MYSQL_TEST_PASSWORD"
  MYSQL_TEST_USER="$MYSQL_TEST_USER"
  TEST_SERVER_PORT="$SERVER_PORT"
  TEST_NMS_HTTP_PORT="$NMS_HTTP_PORT"
  TEST_NMS_RTMP_PORT="$NMS_RTMP_PORT"
done <"$input"

input="./server/.production.env"
while IFS= read -r line; do
  eval $line
  MYSQL_PROD_DATABASE="$DB_NAME"
  MYSQL_PROD_PASSWORD="$MYSQL_PROD_PASSWORD"
  MYSQL_PROD_USER="$MYSQL_PROD_USER"
  PROD_SERVER_PORT="$SERVER_PORT"
  PROD_NMS_HTTP_PORT="$NMS_HTTP_PORT"
  PROD_NMS_RTMP_PORT="$NMS_RTMP_PORT"
done <"$input"

create_dev_user="CREATE USER '${MYSQL_DEV_USER}'@'localhost' IDENTIFIED BY '${MYSQL_DEV_PASSWORD}';\n"
create_prod_db="CREATE DATABASE IF NOT EXISTS ${MYSQL_PROD_DATABASE};\n"
create_test_db="CREATE DATABASE IF NOT EXISTS ${MYSQL_TEST_DATABASE};\n\n"

admin_user_privileges_localhost_to_dev_db="GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_DEV_USER}'@'%';\n"
admin_user_privileges_localhost_to_prod_db="GRANT ALL PRIVILEGES ON ${MYSQL_PROD_DATABASE}.* TO '${MYSQL_PROD_USER}'@'%';\n"
admin_user_privileges_localhost_to_test_db="GRANT ALL PRIVILEGES ON ${MYSQL_TEST_DATABASE}.* TO '${MYSQL_DEV_USER}'@'%';\n\n"

INIT_SQL="${create_dev_user}${create_prod_user}${create_test_user}${admin_user_privileges_localhost_to_dev_db}${admin_user_privileges_localhost_to_prod_db}${admin_user_privileges_localhost_to_test_db}"
echo ${INIT_SQL} >./server/docker_mysql_init/init/init.sql

l01="version: '3.8'\n"
l02="services:\n"
l03='\tclient_development:\n'
l04="\t\tbuild:\n"
l05="\t\t\tcontext: ./client\n"
l06="\t\t\tdockerfile: dockerfile.dev\n"
l07="\t\tports:\n"
l08="\t\t\t- 3006:3006\n"
l08_1="\t\t\t- 9229:9229 # Expose the debugging port\n"
l09="\t\tcontainer_name: muitnt_client_dev\n"
l10="\t\tnetworks:\n"
l11="\t\t\t- muitnt_stack_net_dev\n"
l12="\t\tvolumes:\n"
l13="\t\t\t- ./client/src:/usr/app/src\n"
l14="\t\t\t- ./client/public:/usr/app/public\n"
l15="\t\trestart: "always"\n"
l16="\t\tstdin_open: true\n"
l17="\t\ttty: true\n\n"
l18="\tserver_development:\n"
l19="\t\tcontainer_name: muitnt_server_dev\n"
l20="\t\tbuild:\n"
l21="\t\t\t\tcontext: ./server\n"
l22="\t\t\t\ttarget: development\n"
l23="\t\t\t\tdockerfile: ./dockerfile.dev\n"
l24="\t\tcommand: npm run start:debug\n"
l25="\t\tports:\n"
l26="\t\t\t\t- ${DEV_SERVER_PORT}:${DEV_SERVER_PORT}\n"
l27_1="\t\t\t\t- ${DEV_NMS_HTTP_PORT}:${DEV_NMS_HTTP_PORT}\n"
l27_2="\t\t\t\t- ${DEV_NMS_RTMP_PORT}:${DEV_NMS_RTMP_PORT}\n"
l27_3="\t\t\t\t- 9230:9229\n"
l28="\t\tnetworks:\n"
l29="\t\t\t\t- muitnt_stack_net_dev\n"
l30="\t\tvolumes:\n"
l31="\t\t\t\t- ./server:/usr/src/app\n"
l32="\t\t\t\t- ./uploads:/usr/src/uploads\n"
l33="\t\trestart: unless-stopped\n\n"
l34='\tdb_development:\n'
l35="\t\tcontainer_name: muitnt_mysqlcontainer_dev\n"
l36="\t\timage: mysql\n"
l37="\t\tenvironment:\n"
l38="\t\t\t- MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}\n"
l39="\t\t\t- MYSQL_DATABASE=${MYSQL_DATABASE}\n"
l40="\t\t\t- MYSQL_USER=${MYSQL_DEV_USER}\n"
l41="\t\t\t- MYSQL_PASSWORD=${MYSQL_DEV_PASSWORD}\n"
l42="\t\tcommand: [ --character-set-server=utf8, --collation-server=utf8_persian_ci, --max-allowed-packet=524288000, --default-authentication-plugin=mysql_native_password]\n"
l43="\t\trestart: always\n"
l44="\t\tports:\n"
l45="\t\t\t- 3306:3306\n"
l46="\t\tvolumes:\n"
l47="\t\t\t- dev_db_vol:/var/lib/mysql\n"
l48="\t\t\t- ./server/docker_mysql_init/init:/docker-entrypoint-initdb.d\n"
l49="\t\texpose:\n"
l50="\t\t\t- 3306\n"
l51="\t\tnetworks:\n"
l52="\t\t\t- muitnt_stack_net_dev\n"
l53="\n"
l54="volumes:\n"
l55="\tdev_db_vol:\n"
l56="\t\tdriver: local\n"
l57="\n"
l58="networks:\n"
l59="\tmuitnt_stack_net_dev:\n"
l60="\t\tdriver: bridge\n"
l61=""
l62=""
docker_compose="${l01}${l02}${l03}${l04}${l05}${l06}${l07}${l08}${l08_1}${l09}${l10}${l11}${l12}${l13}${l14}${l15}${l16}${l17}${l18}${l19}${l20}${l21}${l22}${l23}${l24}${l25}${l26}${l27}${l27_1}${l27_2}${l27_3}${l28}${l29}${l30}${l31}${l32}${l33}${l34}${l35}${l36}${l37}${l38}${l39}${l40}${l41}${l42}${l43}${l44}${l45}${l46}${l47}${l48}${l49}${l50}${l51}${l52}${l53}${l54}${l55}${l56}${l57}${l58}${l59}${l60}${l61}${l62}"

echo ${docker_compose} >./docker-compose.dev.yml

sleep 2
sed -i 's/\t/  /g' ./docker-compose.dev.yml
sleep 2

docker compose -f docker-compose.dev.yml down

echo "\n\nstarting app..."

sleep 2

docker compose -f docker-compose.dev.yml up --build -d

sleep 2

# --> if you don't want to use cache (i.e. install node module every time running this command) so enable the next lines.
# docker image prune -f
# docker container prune -f
# docker volume prune -f
# docker system prune -f
# docker system prune -a

echo "\n\napp started."
