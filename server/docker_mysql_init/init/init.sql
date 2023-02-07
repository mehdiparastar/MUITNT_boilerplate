CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON dev_db.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON test_db.* TO 'admin'@'%';

CREATE DATABASE IF NOT EXISTS test_db;

