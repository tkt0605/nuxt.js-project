CREATE USER IF NOT EXISTS 'takato'@'%' IDENTIFIED WITH mysql_native_password BY '0605';
-- takatoというユーザーを作成して、それにプラグインのmysql_native_passwordで作成。
ALTER USER 'takato'@'%' IDENTIFIED WITH mysql_native_password BY '0605';
GRANT ALL PRIVILEGES ON *.* TO 'takato'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
-- -- タイムゾーン設定
-- SET GLOBAL time_zone = '+00:00';
-- SET GLOBAL lc_time_names = 'en_US';

-- -- MySQL にタイムゾーンデータをロード
-- USE mysql;
-- INSERT INTO time_zone_name (Name, Time_zone_id) VALUES ('UTC', 1)
--     ON DUPLICATE KEY UPDATE Time_zone_id = 1;
