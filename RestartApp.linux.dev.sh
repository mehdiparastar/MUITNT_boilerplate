#!/bin/bash

mkdir "./server/docker_mysql_init"
mkdir "./server/docker_mysql_init/init"

input="./server/.development.env"
while IFS= read -r line; do
    eval $line
    MYSQL_DATABASE="$DB_NAME"
    MYSQL_DEV_PASSWORD="$MYSQL_DEV_PASSWORD"
    MYSQL_DEV_USER="$MYSQL_DEV_USER"
done <"$input"

input="./server/.test.env"
while IFS= read -r line; do
    eval $line
    MYSQL_TEST_DATABASE="$DB_NAME"
    MYSQL_TEST_PASSWORD="$MYSQL_TEST_PASSWORD"
    MYSQL_TEST_USER="$MYSQL_TEST_USER"
done <"$input"

create_dev_user="CREATE USER '${MYSQL_DEV_USER}'@'localhost' IDENTIFIED BY '${MYSQL_DEV_PASSWORD}';\n"
admin_user_privileges_localhost_to_dev_db="GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_DEV_USER}'@'%';\n"
admin_user_privileges_localhost_to_test_db="GRANT ALL PRIVILEGES ON ${MYSQL_TEST_DATABASE}.* TO '${MYSQL_DEV_USER}'@'%';\n\n"
USER_SQL="${create_dev_user}${admin_user_privileges_localhost_to_dev_db}${admin_user_privileges_localhost_to_test_db}"
echo ${USER_SQL} >./server/docker_mysql_init/init/01-users.sql

create_test_db="CREATE DATABASE IF NOT EXISTS ${MYSQL_TEST_DATABASE};\n"
DB_SQL="${create_test_db}"
echo ${DB_SQL} >./server/docker_mysql_init/init/02-databases.sql

  db:
    container_name: mysqlcontainer
    image: mysql
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=dev_db
      - MYSQL_USER=admin
      - MYSQL_PASSWORD=admin
    command: [ --character-set-server=utf8, --collation-server=utf8_persian_ci, --max-allowed-packet=524288000, --default-authentication-plugin=mysql_native_password]
    restart: always
    ports:
      - 3306:3306
    volumes:
      - db:/var/lib/mysql
      - ./server/docker_mysql_init/init:/docker-entrypoint-initdb.d
    expose:
      - 3306
    networks:
      - muitnt-stack-net

volumes:
  db:
    driver: local

networks:
  muitnt-stack-net:
    driver: bridge


l01="version: '3.8'\n"
l02="services:\n"
l03='\tclient:\n'
l04="\t\tbuild:\n"
l05="\t\t\tcontext: ./client\n"
l06="\t\t\tdockerfile: dockerfile.dev\n"
l07="\t\tports:\n"
l08="\t\t\t- 3000:3000\n"
l09="\t\tcontainer_name: muitnt-client\n"
l10="\t\tnetworks:\n"
l11="\t\t\t- muitnt-stack-net\n"
l12="\t\tvolumes:\n"
l13="\t\t\t- ./client/src:/usr/app/src\n"
l14="\t\t\t- ./client/public:/usr/app/public\n"
l15="\t\trestart: "always"\n"
l16="\t\tstdin_open: true\n"
l17="\t\ttty: true\n\n"
l18="\tserver:\n"
l19="\t\tcontainer_name: server\n"
l20="\t\tbuild:\n"
l21="\t\t\t\tcontext: ./server\n"
l22="\t\t\t\ttarget: development\n"
l23="\t\t\t\tdockerfile: ./dockerfile.dev\n"
l24="\t\tcommand: npm run start:debug\n"
l25="\t\tports:\n"
l26="\t\t\t\t- 3001:3001\n"
l27="\t\t\t\t- 9229:9229\n"
l28="\t\tnetworks:\n"
l29="\t\t\t\t- muitnt-stack-net\n"
l30="\t\tvolumes:\n"
l31="\t\t\t\t- ./server:/usr/src/app\n"
l32="\t\trestart: unless-stopped\n\n"
l33='\tdb:\n'
l34="\t\tcontainer_name: mysqlcontainer\n"
l35="\t\timage: mysql\n"
l36="\t\tenvironment:\n"
l37="\t\t\t- MYSQL_ROOT_PASSWORD=password\n"
l38="\t\t\t- MYSQL_DATABASE=${MYSQL_DATABASE}\n"
l39="\t\t\t- MYSQL_DEV_USER=${MYSQL_DEV_USER}\n"
l40="\t\t\t- MYSQL_DEV_PASSWORD=${MYSQL_DEV_PASSWORD}\n"
l41="\t\tcommand: [ --character-set-server=utf8, --collation-server=utf8_persian_ci, --max-allowed-packet=524288000, --default-authentication-plugin=mysql_native_password]\n"
l42="\t\trestart: always\n"
l43="\t\tports:\n"
l44="\t\t\t- 3306:3306\n"
l45="\t\tvolumes:\n"
l46="\t\t\t- db:/var/lib/mysql\n"
l47="\t\t\t- ./init:/docker-entrypoint-initdb.d\n"
l48="\t\texpose:\n"
l49="\t\t\t- 3306\n"
l50="\t\tnetworks:\n"
l51="\t\t\t- muitnt-stack-net\n"
l52="\n"
l53="volumes:\n"
l54="\tdb:\n"
l55="\t\tdriver: local\n"
l56="\n"
l57="networks:\n"
l58="\tmuitnt-stack-net:\n"
l59="\t\tdriver: bridge\n"
l60=""
l61=""
docker_compose="${l01}${l02}${l03}${l04}${l05}${l06}${l07}${l08}${l09}${l10}${l11}${l12}${l13}${l14}${l15}${l16}${l17}${l18}${l19}${l20}${l21}${l22}${l23}${l24}${l25}${l26}${l27}${l28}${l29}${l30}${l31}${l32}${l33}${l34}${l35}${l36}${l37}${l38}${l39}${l40}${l41}${l42}${l43}${l44}${l45}${l46}${l47}${l48}${l49}${l50}${l51}${l52}${l53}${l54}${l55}${l56}${l57}${l58}${l59}${l60}${l61}"

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

echo "\n\napp started."