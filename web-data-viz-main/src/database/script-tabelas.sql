
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
    telefone VARCHAR(30),
    fk_cargo INT,
    ativo TINYINT DEFAULT TRUE NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    FOREIGN KEY (fk_cargo) REFERENCES cargo(id)
);

INSERT INTO usuario (nome, email, senha, fk_empresa, fk_cargo, ativo, telefone) VALUES
('Fernanda Lima', 'fernanda.lima@techsolucoes.com', 'senha123', 1, 1, 1, "(11) 98583-1860"), -- Analista
('Ricardo Torres', 'ricardo.torres@techsolucoes.com', 'senha456', 1, 2, 1, "(11) 92057-3048"), -- Técnico Supervisor
('Juliana Silva', 'juliana.silva@techsolucoes.com', 'senha789', 1, 3, 1, "(11) 90940-1920"), -- Técnico
('Sistema Cortex', 'sistema@cortex.com', 'cortexadmin', null, 4, 1, null); -- Cortex


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


CREATE TABLE modelo (
    id_modelo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ip VARCHAR(45),
    hostname VARCHAR(100),
    tempo_parametro_min INT,
    limite_cpu DECIMAL(5,2),
    limite_disco DECIMAL(5,2),
    limite_ram DECIMAL(5,2),
    limite_gpu DECIMAL(5,2),
    fk_cliente INT NOT NULL,
    fk_zona_disponibilidade INT NOT NULL,
    FOREIGN KEY (fk_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (fk_zona_disponibilidade) REFERENCES zonadisponibilidade(id_zona)
);


INSERT INTO modelo (nome, descricao, ip, hostname, tempo_parametro_min, limite_cpu, limite_disco, limite_ram, limite_gpu, fk_cliente, fk_zona_disponibilidade)
VALUES 
-- Modelos para Matrix TI (Cliente 1)
('Modelo Previsor V1', 'Modelo para previsão de demanda', '192.168.0.10', 'previsor-sp01', 15, 85.50, 70.00, 65.00, 10.00, 1, 1),
('Modelo Carga Horária', 'Distribuição de carga ao longo do dia', '192.168.0.11', 'carga-sp02', 10, 80.00, 65.00, 60.00, 8.00, 1, 2),


-- Modelos para CloudCorp (Cliente 2)
('Modelo Balanceador', 'Balanceamento de cargas entre servidores', '192.168.1.10', 'balanceador-sp01', 12, 78.00, 66.00, 67.00, 9.00, 2, 1),
('Modelo Cache', 'Gerenciamento de cache de aplicações', '192.168.1.11', 'cache-sp02', 8, 60.00, 50.00, 55.00, 5.00, 2, 2),
('Modelo Firewall', 'Monitoramento de pacotes suspeitos', '192.168.1.12', 'firewall-mg01', 10, 70.00, 58.00, 60.00, 6.00, 2, 3);



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
);

INSERT INTO alerta (tipo, componente, descricao, status, fk_modelo) 
VALUES 
('Crítico', 'CPU', 'Uso de CPU excedeu 95% por mais de 5 minutos.', 'Ativo', 1),
('Aviso', 'RAM', 'Uso de memória ultrapassou 80%.', 'Resolvido', 2);

