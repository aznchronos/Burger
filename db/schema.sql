create database if not exists burgers_db;

use burgers_db;

create table if not exists burgers (
id int not null auto_increment,
burger_name varchar(50) not null,
devoured boolean,
primary key (id)
);