create database if not exists cortexdb;
/*drop database cortexdb;*/
use cortexdb;

create table empresa (
id_empresa int primary key auto_increment,
nome varchar(100),
cnpj varchar(18),
ativo tinyint 
);

create table usuario (
id_usuario int primary key auto_increment,
fk_empresa int,
nome varchar(100),
email varchar(100),
senha varchar(255),
cargo varchar(50),
tipo_acesso enum("admin","analista","tecnico"),
ativo tinyint,
cpf varchar(20),
telefone varchar(20),
foto blob,
constraint fk_usuario_empresa foreign key(fk_empresa) references empresa(id_empresa)
);

create table cliente (
id_cliente int primary key auto_increment,
fk_empresa int,
nome varchar(80),
descricao varchar(130),
telefone varchar(20),
cnpj varchar(18),
constraint fk_cliente_empresa foreign key(fk_empresa) references empresa(id_empresa)
);

create table zona (
id_zona int primary key auto_increment,
nome varchar(45)
);

create table modelo (
id_modelo int primary key auto_increment,
fk_cliente int,
fk_zona int,
nome varchar(80),
limite_cpu int,
limite_ram int,
limite_disco int,
tempo varchar(70),
descricao varchar(200),
ip varchar(15),
hostname varchar(40),
constraint fk_modelo_cliente foreign key(fk_cliente) references cliente(id_cliente),
constraint fk_modelo_zona foreign key(fk_zona) references zona(id_zona)
);

create table usuario_por_zona (
fk_usuario int,
fk_zona int,

primary key(fk_usuario, fk_zona),
constraint fk_usuario_por_zona foreign key(fk_usuario) references usuario(id_usuario),
constraint fk_zona_contem_usuario foreign key(fk_zona) references zona(id_zona)
);

create table processo (
id_processo int auto_increment,
fk_modelo int,
nome varchar(70),
data_hora_inicio datetime,
data_hora_fim datetime,
status_processo enum("neutro","ativo","inativo"),
matar_processo tinyint,
automatico tinyint,

primary key(id_processo, fk_modelo),
constraint fk_processo_modelo foreign key(fk_modelo) references modelo(id_modelo)
);