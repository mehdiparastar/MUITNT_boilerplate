CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev_db_password';
GRANT ALL PRIVILEGES ON dev_db.* TO 'dev'@'localhost';

CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev_db_password';
GRANT ALL PRIVILEGES ON test_db.* TO 'dev'@'localhost';

