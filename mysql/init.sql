CREATE USER IF NOT EXISTS 'takato'@'%' IDENTIFIED WITH mysql_native_password BY '0605';
-- takatoというユーザーを作成して、それにプラグインのmysql_native_passwordで作成。
ALTER USER 'takato'@'%' IDENTIFIED WITH mysql_native_password BY '0605';
GRANT ALL PRIVILEGES ON *.* TO 'takato'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;