
DROP DATABASE IF EXISTS cortex;
CREATE DATABASE cortex;
USE cortex;


CREATE TABLE empresa (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    ativo TINYINT DEFAULT TRUE NOT NULL, 
    nome_responsavel VARCHAR(100) NOT NULL,
    telefone_responsavel VARCHAR(15) UNIQUE NOT NULL
);

INSERT INTO empresa (nome, cnpj, nome_responsavel, telefone_responsavel)
VALUES 
('Tech Soluções LTDA', '12.345.678/0001-99', 'Ana Souza', '(11) 91234-5678');


CREATE TABLE cargo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50)
);

INSERT INTO cargo (nome) VALUES
('Analista'),
('Técnico Supervisor'),
('Técnico'),
('Cortex');


CREATE TABLE usuario (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fk_empresa INT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(20) NOT NULL,
    fk_cargo INT,
    ativo TINYINT DEFAULT FALSE NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    FOREIGN KEY (fk_cargo) REFERENCES cargo(id)
);

INSERT INTO usuario (nome, email, senha, fk_empresa, fk_cargo, ativo) VALUES
('Fernanda Lima', 'fernanda.lima@techsolucoes.com', 'senha123', 1, 1, 1), -- Analista
('Ricardo Torres', 'ricardo.torres@techsolucoes.com', 'senha456', 1, 2, 1), -- Técnico Supervisor
('Juliana Silva', 'juliana.silva@techsolucoes.com', 'senha789', 1, 3, 1), -- Técnico
('Sistema Cortex', 'sistema@cortex.com', 'cortexadmin', 1, 4, 1); -- Cortex


CREATE TABLE zonadisponibilidade (
    id_zona INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    fk_empresa INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

INSERT INTO zonadisponibilidade (nome, descricao, fk_empresa) VALUES
-- Zonas da Empresa 1
('SP-01', 'Zona principal em São Paulo, datacenter Tier III', 1),
('SP-02', 'Zona de contingência em São Paulo, menor capacidade', 1),
('MG-01', 'Zona em Minas Gerais, para balanceamento de carga', 1);




CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    fk_empresa INT,
    nome VARCHAR(80),
    descricao VARCHAR(130),
    email VARCHAR(40),
    telefone VARCHAR(20),
    cnpj VARCHAR(18),
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

INSERT INTO cliente (nome, descricao, email, telefone, cnpj, fk_empresa) 
VALUES 
-- Clientes da Empresa 1
('Matrix TI', 'Consultoria em tecnologia e cloud', 'contato@matrixti.com', '(11) 98765-4321', '11.111.111/0001-11', 1),
('CloudCorp', 'Infraestrutura em nuvem e segurança', 'contato@cloudcorp.com', '(11) 91234-5678', '11.111.111/0001-22', 1);



    
  create table arquitetura (
        id_arquitetura int primary key auto_increment,
        nome varchar(55),
        modelo_cpu varchar(55),
        qtd_cpu int,
        qtd_ram int,
        modelo_gpu varchar(55),
        so varchar(55),
        maxDisco int,
        qtd int,
        fk_zona int,
        fk_empresa int,
        foreign key (fk_zona) references zonadisponibilidade(id_zona),
        foreign key (fk_empresa) references empresa(id)
        ON DELETE CASCADE
        );
        
INSERT INTO arquitetura (id_arquitetura, nome, modelo_cpu, qtd_cpu, qtd_ram, modelo_gpu, so, maxDisco, qtd, fk_zona,fk_empresa)
VALUES (1, 'Servidor de Produção 01', 'Intel Xeon Gold 6248R', 2, 128, 'NVIDIA T4', 'Ubuntu Server 22.04', 512, 1, 1,1);

     
INSERT INTO arquitetura (id_arquitetura, nome, modelo_cpu, qtd_cpu, qtd_ram, modelo_gpu, so, maxDisco, qtd, fk_zona,fk_empresa)
VALUES (2, 'Servidor de Produção 01', 'Intel Xeon Gold 6248R', 2, 128, 'NVIDIA T4', 'Ubuntu Server 22.04', 256, 1, 1,1);

create table if not exists modelo (
    id_modelo int primary key auto_increment,
    nome varchar(100) not null,
    qtd_disco int,
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
    fk_arquitetura int not null,
        foreign key (fk_cliente) references cliente(id_cliente),
        foreign key (fk_zona_disponibilidade) references zonadisponibilidade(id_zona),
        foreign key (fk_arquitetura) references arquitetura(id_arquitetura)
        ON DELETE CASCADE
);
INSERT INTO modelo (
    nome, descricao, ip, hostname, qtd_disco, -- <-- Adicionado aqui
    tempo_parametro_min, limite_cpu, limite_disco, limite_ram, limite_gpu, 
    fk_cliente, fk_zona_disponibilidade, fk_arquitetura
) VALUES (
    'Modelo Análise Preditiva V2', 'Modelo otimizado para análise de dados históricos', '10.1.1.5', 'preditivo-sp01', 500, -- <-- Valor adicionado
    10, 80.00, 75.00, 70.00, 15.00, 
    1, 1, 1
);

INSERT INTO modelo (
    nome, descricao, ip, hostname, qtd_disco, 
    tempo_parametro_min, limite_cpu, limite_disco, limite_ram, limite_gpu, 
    fk_cliente, fk_zona_disponibilidade, fk_arquitetura
) VALUES (
    'Modelo Relatórios MG', 'Geração de relatórios consolidados da filial MG', '172.16.5.15', 'relatorio-mg01', 200, -- <-- Valor adicionado
    30, 70.00, 60.00, 65.00, 5.00, 
    1, 3, 1
);



CREATE TABLE acesso_zona (
    fk_usuario INT NOT NULL,
    fk_zona INT NOT NULL,
    PRIMARY KEY (fk_usuario, fk_zona),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_zona) REFERENCES zonadisponibilidade(id_zona) ON DELETE CASCADE
);

INSERT INTO acesso_zona (fk_usuario, fk_zona) VALUES
-- Acesso para Fernanda Lima
(1, 1),
(1, 2),
(1, 3),

-- Acesso para Ricardo Torres
(2, 1),
(2, 2),
(2, 3),

-- Acesso para Juliana Silva
(3, 1),
(3, 2);



CREATE TABLE black_list (
    id_processo INT AUTO_INCREMENT,
    fk_modelo INT,
    nome VARCHAR(70),
    matar_processo TINYINT,
    automatico TINYINT,
    PRIMARY KEY (id_processo, fk_modelo),
    FOREIGN KEY (fk_modelo) REFERENCES modelo(id_modelo)
);


CREATE TABLE alerta (
    id_alerta INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    descricao VARCHAR(255),
    status VARCHAR(50),
    fk_modelo INT,
    componente VARCHAR(50),
    FOREIGN KEY (fk_modelo) REFERENCES modelo(id_modelo)
    ON DELETE CASCADE
);

INSERT INTO alerta (tipo, componente, descricao, status, fk_modelo) 
VALUES 
('Risco', 'CPU', 'Uso de CPU excedeu 95% por mais de 5 minutos.', 'Ativo', 1);

select * from usuario;
select * from arquitetura;
select * from modelo;
