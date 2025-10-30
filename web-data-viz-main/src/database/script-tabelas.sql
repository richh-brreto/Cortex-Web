
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
    foto VARCHAR(500) default "../assets/icon/sem_foto.png",
    ativo TINYINT DEFAULT TRUE NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    FOREIGN KEY (fk_cargo) REFERENCES cargo(id)
    ON DELETE CASCADE
);

INSERT INTO usuario (nome, email, senha, fk_empresa, fk_cargo, ativo, telefone) VALUES
('Fernanda Lima', 'fernanda.lima@techsolucoes.com', 'senha123', 1, 1, 1, "(11) 98583-1860"), -- Analista
('Ricardo Torres', 'ricardo.torres@techsolucoes.com', 'senha456', 1, 1, 0, "(11) 92057-3048"), -- Técnico Supervisor
('Juliana Silva', 'juliana.silva@techsolucoes.com', 'senha789', 1, 3, 1, "(11) 90940-1920"), -- Técnico
('Sistema Cortex', 'sistema@cortex.com', 'cortexadmin', null, 4, 1, null); -- Cortex


CREATE TABLE zonadisponibilidade (
    id_zona INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    fk_empresa INT,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
    ON DELETE SET NULL
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
    ON DELETE CASCADE
);

INSERT INTO cliente (nome, descricao, email, telefone, cnpj, fk_empresa) 
VALUES 
-- Clientes da Empresa 1
('Matrix TI', 'Consultoria em tecnologia e cloud', 'contato@matrixti.com', '(11) 98765-4321', '11.111.111/0001-11', 1),
('CloudCorp', 'Infraestrutura em nuvem e segurança', 'contato@cloudcorp.com', '(11) 91234-5678', '11.111.111/0001-22', 1);

  create table arquitetura (
        id_arquitetura int primary key,
        nome varchar(55),
        modelo_cpu varchar(55),
        qtd_cpu int,
        qtd_ram int,
        modelo_gpu varchar(55),
        so varchar(55),
        maxDisco int,
        fk_empresa int not null,
        foreign key (fk_empresa) references empresa(id)
        );
        
INSERT INTO arquitetura (id_arquitetura, nome, modelo_cpu, qtd_cpu, qtd_ram, modelo_gpu, so, maxDisco, fk_empresa)
VALUES 
(1, 'Servidor de Produção 01', 'Intel Xeon Gold 6248R', 8, 128, 'NVIDIA T4', 'Ubuntu Server 22.04', 4000, 1),
(2, 'Servidor de Produção 02', 'Intel Xeon Gold 6248R', 16, 128, 'NVIDIA T4', 'Ubuntu Server 22.04', 2000, 1);

create table arquitetura_zona (
	fk_arquitetura int,
    fk_zona int,
    qtd int,
    primary key (fk_arquitetura, fk_zona),
    foreign key (fk_zona) references zonadisponibilidade(id_zona)
    on delete cascade,
    foreign key (fk_arquitetura) references arquitetura(id_arquitetura)
    on delete cascade
);

INSERT INTO arquitetura_zona (fk_arquitetura, fk_zona, qtd) VALUES
(1, 1, 3), 
(1, 2, 2), 
(2, 1, 4), 
(2, 3, 1); 


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
    fk_zona_disponibilidade int,
    fk_arquitetura int,
        foreign key (fk_cliente) references cliente(id_cliente)
        ON DELETE CASCADE,
        foreign key (fk_zona_disponibilidade) references zonadisponibilidade(id_zona)
        ON DELETE SET NULL,
        foreign key (fk_arquitetura) references arquitetura(id_arquitetura)
        ON DELETE SET NULL
);

INSERT INTO modelo (nome, descricao, ip, hostname, tempo_parametro_min, limite_cpu, limite_disco, limite_ram, limite_gpu, fk_cliente, fk_zona_disponibilidade,fk_arquitetura)
VALUES 
-- Modelos para Matrix TI (Cliente 1)
('Modelo Previsor V1', 'Modelo para previsão de demanda', '10.102.136.40', 'DESKTOP-N2E1DHL', 15, 85.50, 70.00, 65.00, 10.00, 1, 1,1),
('Modelo Carga Horária', 'Distribuição de carga ao longo do dia', '192.168.0.192 ', 'DESKTOP-N2E1DHL', 10, 80.00, 65.00, 60.00, 8.00, 1, 2,1),


-- Modelos para CloudCorp (Cliente 2)
('Modelo Balanceador', 'Balanceamento de cargas entre servidores', '192.168.1.10', 'balanceador-sp01', 12, 78.00, 66.00, 67.00, 9.00, 2, 1,2),
('Modelo Cache', 'Gerenciamento de cache de aplicações', '192.168.1.11', 'cache-sp02', 8, 60.00, 50.00, 55.00, 5.00, 2, 2,2),
('Modelo Firewall', 'Monitoramento de pacotes suspeitos', '192.168.1.12', 'firewall-mg01', 10, 70.00, 58.00, 60.00, 6.00, 2, 3,2);



CREATE TABLE acesso_zona (
    fk_usuario INT,
    fk_zona INT,
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
    matar_processo boolean default true,
    status ENUM("proibido","neutro","automatico"),
    PRIMARY KEY (id_processo, fk_modelo),
    FOREIGN KEY (fk_modelo) REFERENCES modelo(id_modelo)
    ON DELETE CASCADE,
	CONSTRAINT UQ_modelo_processo UNIQUE (fk_modelo, nome) 
);

INSERT INTO black_list (fk_modelo, nome, status, matar_processo) 
VALUES (1, 'calc.exe', 'proibido', 0);

-- Exemplo 2: Processo 'java_update.exe' marcado para autokill (status='automatico') para o modelo 1, autokill LIGADO (matar_processo=1)
INSERT INTO black_list (fk_modelo, nome, status, matar_processo) 
VALUES (1, 'java_update.exe', 'automatico', 1);

-- Exemplo 3: Processo 'algum_script.bat' proibido para o modelo 2, autokill DESLIGADO (matar_processo=0)
INSERT INTO black_list (fk_modelo, nome, status, matar_processo) 
VALUES (2, 'algum_script.bat', 'proibido', 0);

-- Exemplo 4: Processo 'svchost.exe' foi morto (status='neutro') para o modelo 1, flag matar LIGADA (matar_processo=1) 
-- (Este NÃO aparecerá na tabela da blacklist, mas o registo existe)
INSERT INTO black_list (fk_modelo, nome, status, matar_processo) 
VALUES (1, 'svchost.exe', 'neutro', 1)
ON DUPLICATE KEY UPDATE status = 'neutro', matar_processo = 1; -- Garante que atualiza se já existia

-- Exemplo 5: Processo 'discord.exe' marcado para autokill para o modelo 3, autokill LIGADO
INSERT INTO black_list (fk_modelo, nome, status, matar_processo) 
VALUES (3, 'discord.exe', 'automatico', 1);

CREATE TABLE alerta (
    id_alerta INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50),  -- gpu,ram,disco,cpu,processo
    parametro INT,
    valor_maximo_encontrado INT,
    data_hora_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,  
    data_hora_fim_chamado DATETIME,  -- referente ao chamado (é setado esse campo quando algum técnico resolve o chamado)
     data_hora_fim_alerta DATETIME, -- referente ao alerta, então quando se encerrou aquele alerta
    status VARCHAR(50),
    fk_modelo INT,
    fk_usuario INT,
    relatorio VARCHAR(400),
    FOREIGN KEY (fk_modelo) REFERENCES modelo(id_modelo)
    ON DELETE CASCADE,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
    ON DELETE CASCADE
);

INSERT INTO alerta 
(tipo, parametro, valor_maximo_encontrado, status, fk_modelo, fk_usuario, data_hora_fim_chamado, data_hora_fim_alerta, relatorio)
VALUES

('cpu', 85.50, 93.20, 'Ativo', 1, NULL, NULL, NULL, NULL),

('ram', 65.00, 78.50, 'Resolvido', 1, 2, '2025-10-27 14:40:00', '2025-10-27 14:35:00',
 'Ricardo analisou os logs de memória e identificou scripts consumindo mais RAM que o previsto, ajustou configurações e liberou recursos, garantindo operação normal do sistema.'),

('disco', 70.00, 95.10, 'Ativo', 1, NULL, NULL, NULL, NULL),

('gpu', 10.00, 15.20, 'Resolvido', 1, 3, '2025-10-26 17:50:00', '2025-10-26 17:45:00',
 'Juliana monitorou o uso da GPU, detectou alto consumo nos containers de IA e otimizou os processos, reduzindo o impacto e estabilizando a performance do sistema.'),

('processo', 1.00, 1.00, 'Resolvido', 1, 2, '2025-10-27 09:15:00', '2025-10-27 09:10:00',
 'Ricardo identificou o processo processoA em execução indevida, finalizou-o e atualizou a blacklist, prevenindo novos conflitos e garantindo a estabilidade do ambiente.');

select * from usuario;

-- Select para pegar os processos que estão na black-list
select nome,status from black_list where status in('proibido','automatico') and fk_modelo=1;
select * from black_list;

select * from modelo;
