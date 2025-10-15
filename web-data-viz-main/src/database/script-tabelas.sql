create database cortex;
use cortex;

CREATE TABLE empresa (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    ativo TINYINT DEFAULT TRUE NOT NULL, 
    nome_responsavel VARCHAR(100) NOT NULL,
    telefone_responsavel VARCHAR(15) UNIQUE NOT NULL
);

create table cargo(
id int primary key,
nome varchar(50));

CREATE TABLE usuario (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fk_empresa INT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(20) NOT NULL,
    fk_cargo int,
    ativo TINYINT DEFAULT FALSE NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    foreign key (fk_cargo) references cargo(id)
);


CREATE TABLE zonadisponibilidade (
    id_zona INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    fk_empresa INT NOT NULL,
        FOREIGN KEY (fk_empresa) 
        REFERENCES empresa(id)
);


INSERT INTO zonadisponibilidade (nome, descricao, fk_empresa) VALUES
('SP-02', 'Zona principal em São Paulo, datacenter Tier III', 2);

create table cliente (
id_cliente int primary key auto_increment,
fk_empresa int,
nome varchar(80),
descricao varchar(130),
telefone varchar(20),
cnpj varchar(18),
constraint fk_cliente_empresa foreign key(fk_empresa) references empresa(id_empresa)
);

select * from zonadisponibilidade;

INSERT INTO cliente (nome, email_contato, telefone_contato, fk_empresa) 
VALUES ('Matrix TI', 'contato@matrixti.com', '(11) 98765-4321', 2);

INSERT INTO cliente (nome, email_contato, telefone_contato, fk_empresa) 
VALUES ('Richard tech', 'ti.com', '(11) 98765-4321', 2);

create table if not exists modelo (
    id_modelo int primary key auto_increment,
    nome varchar(100) not null,
    descricao text,
    ip varchar(45),
    hostname varchar(100),
    tempo_parametro_min int,
    limite_cpu decimal(5,2),
    limite_disco decimal(5,2),
    limite_ram decimal(5,2),
    limite_gpu decimal(5,2),
    fk_cliente int not null,
    fk_zona_disponibilidade int not null,
        foreign key (fk_cliente) references cliente(id_cliente),
        foreign key (fk_zona_disponibilidade) references zonadisponibilidade(id_zona)
);

select * from modelo;

SELECT id, nome, email FROM usuario WHERE ativo = 0;
use cortex;


INSERT INTO usuario (nome, email, senha, ativo, administrador, fk_empresa) 
VALUES ('Ana Silva (Pendente)', 'ana.pendente@email.com', 'senha123', 0, 2, 1);


INSERT INTO usuario (nome, email, senha, ativo, administrador, fk_empresa) 
VALUES ('Bruno Costa (Pendente)', 'brunoe.pendente@email.com', 'senha456', 0, 2, 2);


INSERT INTO usuario (nome, email, senha, ativo, administrador, fk_empresa) 
VALUES ('Carlos Dias (Ativo)', 'carlos.ativo@email.com', 'senha789', 1, 2, 1);

use cortex;
select * from modelo;
select * from usuario;

create table if not exists acesso_zona (
    fk_usuario int not null,
    fk_zona int not null,
    primary key (fk_usuario, fk_zona),
    constraint fk_acesso_usuario
        foreign key (fk_usuario)
        references usuario(id)
        on delete cascade,
    constraint fk_acesso_zona
        foreign key (fk_zona)
        references zonadisponibilidade(id_zona)
        on delete cascade
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


insert into acesso_zona (fk_usuario,fk_zona) values (6,1);



create table if not exists alerta (
    id_alerta int primary key auto_increment,
    tipo varchar(50),
    data_hora datetime default current_timestamp,
    descricao varchar(255),
    status varchar(50),
    fk_modelo int,
    componente varchar(50),
    constraint fk_alerta_modelo foreign key (fk_modelo) references modelo(id_modelo)
);

INSERT INTO alerta (tipo, componente, descricao, status, fk_modelo) 
VALUES ('Crítico', 'CPU', 'Uso de CPU excedeu 95% por mais de 5 minutos.', 'Ativo', 1);



        





select * from usuario;



CREATE TABLE zonadisponibilidade (
    id_zona INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    fk_empresa INT NOT NULL,
        FOREIGN KEY (fk_empresa) 
        REFERENCES empresa(id)
);

INSERT INTO zonadisponibilidade (nome, descricao, fk_empresa) VALUES
('SP-01', 'Zona principal em São Paulo, datacenter Tier III', 2);

CREATE TABLE IF NOT EXISTS cliente (
id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email_contato VARCHAR(100) UNIQUE,
    telefone_contato VARCHAR(20),
    fk_empresa INT NOT NULL, 
        FOREIGN KEY (fk_empresa) 
        REFERENCES empresa(id)
);

select * from zonadisponibilidade;


create table modelo (
    id_modelo int primary key auto_increment,
    nome varchar(100) not null,
    descricao text,
    ip varchar(45),
    hostname varchar(100),
    tempo_parametro_min int,
    limite_cpu decimal(5,2),
    limite_disco decimal(5,2),
    limite_ram decimal(5,2),
    limite_gpu decimal(5,2),
    fk_cliente int not null,
    fk_zona_disponibilidade int not null,
        foreign key (fk_cliente) references cliente(id_cliente),
        foreign key (fk_zona_disponibilidade) references zonadisponibilidade(id_zona)
);