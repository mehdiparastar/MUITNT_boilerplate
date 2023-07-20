CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON dev_db.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON prod_db.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON test_db.* TO 'admin'@'%';


