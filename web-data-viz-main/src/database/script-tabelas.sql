create database CORTEX;
use CORTEX;

CREATE TABLE endereco (
    idendereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado CHAR,
    cep VARCHAR(9)
);

CREATE TABLE empresa (
    idempresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    CNPJ VARCHAR(18),
    telefone VARCHAR(20),
    ativo TINYINT,
    fkendereco INT,
    FOREIGN KEY (fkendereco) REFERENCES endereco(idendereco)
);

CREATE TABLE usuario (
    idusuario INT PRIMARY KEY AUTO_INCREMENT,
    idempresa INT,
    email VARCHAR(100),
    senha VARCHAR(20),
    administrador BOOLEAN DEFAULT TRUE,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (idempresa) REFERENCES empresa(idempresa)
);

CREATE TABLE datacenter (
    iddatacenter INT PRIMARY KEY AUTO_INCREMENT,
    idendereco INT,
    identificacao VARCHAR(80),
    FOREIGN KEY (idendereco) REFERENCES endereco(idendereco)
);

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    duracao INT,
    limite INT,
    inicio DATETIME,
    datacenter_iddatacenter INT,
    FOREIGN KEY (datacenter_iddatacenter) REFERENCES datacenter(iddatacenter)
);
