-- drop database cortex;
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

CREATE TABLE usuario (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fk_empresa INT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(20) NOT NULL,
    administrador BOOLEAN DEFAULT TRUE NOT NULL,
    ativo TINYINT DEFAULT TRUE NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);



CREATE TABLE servidor (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	fk_datacenter INT NOT NULL,
    identificacao VARCHAR(80) UNIQUE NOT NULL,
    rack INT NOT NULL,
    FOREIGN KEY (fk_datacenter) references datacenter(id),
    FOREIGN KEY (rack) references servidor(id)
);
    
CREATE TABLE servidor_usuario (
    fk_servidor INT NOT NULL,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_servidor) REFERENCES servidor(id),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    PRIMARY KEY (fk_servidor, fk_usuario)
);

CREATE TABLE menu_processo (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_usuario_processo VARCHAR(45) NOT NULL,
    unidade_de_medida VARCHAR(45) NOT NULL,
    maximo DECIMAL(10,2) NOT NULL,
    inicio DATETIME NOT NULL,
    fim DATETIME NOT NULL,
    ativo TINYINT NOT NULL
);

CREATE TABLE componentes (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_componente VARCHAR(40) NOT NULL,
    fk_servidor INT NOT NULL,
    fk_menu_processo INT NOT NULL,
    FOREIGN KEY (fk_servidor) REFERENCES servidor(id),
    FOREIGN KEY (fk_menu_processo) REFERENCES menu_processo(id)
);

CREATE TABLE alerta (
	fk_menu_processo INT NOT NULL PRIMARY KEY,
    data_e_hora DATETIME NOT NULL,
    valor VARCHAR(45) NOT NULL
);

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

