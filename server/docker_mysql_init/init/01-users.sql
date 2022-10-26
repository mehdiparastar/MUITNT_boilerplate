CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev_db_password';
GRANT ALL PRIVILEGES ON dev_db.* TO 'dev'@'localhost';

CREATE USER 'test'@'localhost' IDENTIFIED BY 'test_db_password';
GRANT ALL PRIVILEGES ON test_db.* TO 'test'@'localhost';

