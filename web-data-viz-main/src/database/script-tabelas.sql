drop database cortex;
create database cortex;
use cortex;

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100),
    CNPJ VARCHAR(18) UNIQUE,
    ativo TINYINT, 
    Nome_responsavel VARCHAR(100),
    Telefone_responsavel VARCHAR(45)
);

CREATE TABLE Documento (
    idDocumento INT PRIMARY KEY AUTO_INCREMENT,
    FK_empresa INT,
    nome_documento VARCHAR(45),
    formato_documento VARCHAR(45),
    documento MEDIUMBLOB,
    FOREIGN KEY (FK_empresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    FK_empresa INT,
    Nome VARCHAR(100),
    Email VARCHAR(100),
    Senha VARCHAR(20),
    Administrador BOOLEAN DEFAULT TRUE,
    Ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (FK_empresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Datacenter (
    idDatacenter INT PRIMARY KEY AUTO_INCREMENT,
    FK_empresa INT,
    Nome_datacenter VARCHAR(80),
    CEP VARCHAR(9),
    Complemento VARCHAR(100),
    Numero VARCHAR(10),
    FOREIGN KEY (FK_empresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Rack (
	idRack INT PRIMARY KEY AUTO_INCREMENT,
	FK_datacenter INT,
    Nome_rack VARCHAR(45),
	FOREIGN KEY (FK_datacenter) references Datacenter(idDatacenter)
    );

CREATE TABLE Servidor (
    idServidor INT PRIMARY KEY AUTO_INCREMENT,
	FK_rack INT,
    Identificacao VARCHAR(80),
    FOREIGN KEY (FK_rack) REFERENCES Rack(idRack)
);
    
CREATE TABLE ServidorUsuario (
    FK_servidor INT,
    FK_usuario INT,
    FOREIGN KEY (FK_servidor) REFERENCES Servidor(idServidor),
    FOREIGN KEY (FK_usuario) REFERENCES Usuario(idUsuario),
    PRIMARY KEY (FK_servidor, FK_usuario)
);

CREATE TABLE EspecificaçãoHardware (
    idEspecificacaoHardware INT PRIMARY KEY AUTO_INCREMENT,
    Modelo_cpu VARCHAR(45),
    Qtd_cpu INT NOT NULL,
    Qtd_disco INT NOT NULL,
    Qtd_ram INT NOT NULL,
    FK_servidor INT,
    FOREIGN KEY (FK_servidor) REFERENCES Servidor(idServidor)
);

CREATE TABLE Processo (
    idProcesso INT AUTO_INCREMENT,
    FK_servidor INT,
    Nome_componente VARCHAR(45),
    Nome_processo VARCHAR(45),
    Metrica_decimal DECIMAL (10, 2),
    Metrica_string VARCHAR(45),
    Metrica_percent DECIMAL (10, 2),
    Data_hora DATETIME,
    PRIMARY KEY (idProcesso, FK_servidor),
    FOREIGN KEY (FK_servidor) REFERENCES Servidor(idServidor)
);

CREATE TABLE MetricaAlerta (
    idAlerta INT AUTO_INCREMENT,
    FK_processo INT,
    Maximo DECIMAL(10, 2),
    Minimo DECIMAL(10, 2),
    Inicio DATETIME,
    Fim DATETIME,
    PRIMARY KEY (idAlerta, FK_processo),
    FOREIGN KEY (FK_processo) REFERENCES Processo(idProcesso)
);

CREATE TABLE MetricasDisponiveis (
    FK_processo INT,
    FK_servidor INT,
    Nome_opcao VARCHAR(45),
    Nome_componente VARCHAR(45),
    Nome_metrica VARCHAR(45),
    PRIMARY KEY (FK_processo, FK_servidor),
    FOREIGN KEY (FK_processo) REFERENCES Processo(idProcesso),
    FOREIGN KEY (FK_servidor) REFERENCES Servidor(idServidor)
);