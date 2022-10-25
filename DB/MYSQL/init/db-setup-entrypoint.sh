#!/bin/bash

# export MYSQL_DATABASE=dev_db
# export MYSQL_USER=dev
# export MYSQL_PASSWORD=dev_password
# export MYSQL_TEST_DATABASE=test_db
# export MYSQL_TEST_USER=test
# export MYSQL_TEST_PASSWORD=test_password

create_dev_user="CREATE USER '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';\n"
dev_user_privileges="GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'localhost';\n\n"

create_test_user="CREATE USER '${MYSQL_TEST_USER}'@'localhost' IDENTIFIED BY '${MYSQL_TEST_PASSWORD}';\n"
test_user_privileges="GRANT ALL PRIVILEGES ON ${MYSQL_TEST_DATABASE}.* TO '${MYSQL_TEST_USER}'@'localhost';\n"

USER_SQL="${create_dev_user}${dev_user_privileges}${create_test_user}${test_user_privileges}"

echo -e ${USER_SQL} > ./docker-entrypoint-initdb.d/01-users.sql




create_test_db="CREATE DATABASE IF NOT EXISTS '${MYSQL_TEST_DATABASE}';\n"

DB_SQL="${create_test_db}"

echo -e ${DB_SQL} > ./docker-entrypoint-initdb.d/02-databases.sql
