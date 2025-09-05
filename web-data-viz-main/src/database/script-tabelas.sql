-- drop database cortex;
create database cortex;
use cortex;

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    CNPJ VARCHAR(18) UNIQUE NOT NULL,
    ativo TINYINT NOT NULL, 
    Nome_responsavel VARCHAR(100) NOT NULL,
    Telefone_responsavel VARCHAR(11) UNIQUE NOT NULL
);

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    FK_empresa INT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Senha VARCHAR(20) NOT NULL,
    Administrador BOOLEAN DEFAULT TRUE NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE NOT NULL,
    FOREIGN KEY (FK_empresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Datacenter (
    idDatacenter INT PRIMARY KEY AUTO_INCREMENT,
    FK_empresa INT,
    Nome_datacenter VARCHAR(80) NOT NULL,
    CEP VARCHAR(9) NOT NULL,
    Complemento VARCHAR(100) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    FOREIGN KEY (FK_empresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Servidor (
    idServidor INT PRIMARY KEY AUTO_INCREMENT,
	FK_rack INT,
    Identificacao VARCHAR(80) UNIQUE NOT NULL,
    FOREIGN KEY (FK_rack) references Datacenter(idDatacenter)
);
    
CREATE TABLE ServidorUsuario (
    FK_servidor INT,
    FK_usuario INT,
    FOREIGN KEY (FK_servidor) REFERENCES Servidor(idServidor),
    FOREIGN KEY (FK_usuario) REFERENCES Usuario(idUsuario),
    PRIMARY KEY (FK_servidor, FK_usuario)
);

CREATE TABLE Processo (
    idProcesso INT AUTO_INCREMENT,
    FK_servidor INT,
    Nome_processo VARCHAR(45)NOT NULL,
    Metrica_percent DECIMAL (10, 2) NOT NULL,
    Data_hora DATETIME NOT NULL,
    PRIMARY KEY (idProcesso, FK_servidor),
    FOREIGN KEY (FK_servidor) REFERENCES Servidor(idServidor)
);

CREATE TABLE MetricaAlerta (
    idAlerta INT AUTO_INCREMENT,
    FK_processo INT,
    Maximo DECIMAL(10, 2) NOT NULL,
    Minimo DECIMAL(10, 2) NOT NULL,
    Inicio DATETIME NOT NULL,
    Fim DATETIME NOT NULL,
    PRIMARY KEY (idAlerta, FK_processo),
    FOREIGN KEY (FK_processo) REFERENCES Processo(idProcesso)
);
