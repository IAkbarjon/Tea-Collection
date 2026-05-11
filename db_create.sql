-- Создание таблиц
create table material_types (
	id serial primary key,
	type_name varchar(40),
	losses_percent decimal(5, 2)
);

create table materials (
	id serial primary key,
	material_name varchar(40),
	type_name varchar(40),
	type_id int references material_types(id),
	unit_price decimal(10, 2),
	stock_quantity decimal(10, 3),
	min_quantity decimal(10, 3),
	package_quantity decimal(10, 3),
	measurement_unit varchar(10)
);

create table product_types (
	id serial primary key,
	type_name varchar(40),
	coefficient decimal(5, 2)
);

create table products (
	id serial primary key,
	article varchar(20),
	type_name varchar(40),
	type_id int references product_types(id),
	product_name varchar(40),
	min_price_for_partners decimal(10, 2)
);

create table materials_products (
	id serial primary key,
	material_name varchar(40),
	product_name varchar(40),
	material_id int references materials(id),
	product_id int references products(id),
	materials_required decimal(5, 3)
);

-- Изменение таблиц
update materials m
set type_id = t.id
from material_types t
where m.type_name = t.type_name;

select * from materials;

alter table materials
drop column type_name;


update products p
set type_id = t.id
from product_types t
where p.type_name = t.type_name;

select * from products;

alter table products
drop column type_name;


update materials_products mp
set material_id = m.id
from materials m
where mp.material_name = m.material_name;

select * from materials_products;

alter table materials_products
drop column material_name;


update materials_products mp
set product_id = p.id
from products p
where mp.product_name = p.product_name;

select * from materials_products;

alter table materials_products
drop column product_name;


--