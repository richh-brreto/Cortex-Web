drop database CORTEX;
create database CORTEX;
use CORTEX;

CREATE TABLE empresa (
    idempresa INT PRIMARY KEY AUTO_INCREMENT,
    CNPJ VARCHAR(18),
    ativo TINYINT
);

CREATE TABLE usuario (
    idusuario INT PRIMARY KEY AUTO_INCREMENT,
    idempresa INT,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(20),
    administrador BOOLEAN DEFAULT TRUE,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (idempresa) REFERENCES empresa(idempresa)
);

CREATE TABLE datacenter (
    iddatacenter INT PRIMARY KEY AUTO_INCREMENT,
    identificacao VARCHAR(80),
    cep varchar(9),
    complemento varchar(100),
    numero varchar(20)
);

CREATE TABLE rack (
	idRack int primary key auto_increment,
	fkDatacenter int,
	constraint foreign key (fkDatacenter) references datacenter(iddatacenter)
    );

CREATE TABLE servidor (
	fkRack int,
    identificacao VARCHAR(80),
    constraint foreign key (fkRack) references rack(idRack)
    );
    

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    duracao INT,
    limite INT,
    inicio DATETIME,
    datacenter_iddatacenter INT,
    FOREIGN KEY (datacenter_iddatacenter) REFERENCES datacenter(iddatacenter)
);
