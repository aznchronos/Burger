use rv1a9vi1eu46079e;

create table if not exists burgers (
id int not null auto_increment,
burger_name varchar(50) not null,
devoured boolean,
primary key (id)
);

alter table burgers
add column createdAt timestamp default current_timestamp after devoured;