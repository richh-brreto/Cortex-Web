
DROP DATABASE IF EXISTS cortex;
CREATE DATABASE cortex;
USE cortex;


CREATE TABLE empresa (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    ativo TINYINT DEFAULT FALSE NOT NULL, 
    nome_responsavel VARCHAR(100) NOT NULL,
    telefone_responsavel VARCHAR(15) UNIQUE NOT NULL
);

INSERT INTO empresa (nome, cnpj, nome_responsavel, telefone_responsavel, ativo)
VALUES 
('Tech Soluções LTDA', '12.345.678/0001-99', 'Ana Souza', '(11) 91234-5678', TRUE),
('Cortex', '00.000.000/0000-00', "Cortex", "(00) 00000-0000", TRUE);


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
    fk_cargo INT DEFAULT 1,
    foto VARCHAR(500) DEFAULT 'sem-foto.png',
    ativo TINYINT DEFAULT TRUE NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    FOREIGN KEY (fk_cargo) REFERENCES cargo(id)
    ON DELETE CASCADE
);

INSERT INTO usuario (nome, email, senha, fk_empresa, fk_cargo, ativo, telefone) VALUES
('Fernanda Lima', 'fernanda.lima@techsolucoes.com', 'senha123', 1, 1, 1, "(11) 98583-1860"), -- Analista
('Ricardo Torres', 'ricardo.torres@techsolucoes.com', 'senha456', 1, 2, 1, "(11) 92057-3048"), -- Técnico Supervisor
('Marcos Silva', 'marcos.silva@techsolucoes.com', 'senha789', 1, 3, 1, "(11) 90940-1920"),
('Sistema Cortex', 'sistema@cortex.com', 'cortexadmin', 2, 4, 1, "(00) 00000-0000"); -- Cortex


CREATE TABLE zonadisponibilidade (
    id_zona INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    fk_empresa INT,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
     ON DELETE SET NULL
);

INSERT INTO zonadisponibilidade (nome, descricao, fk_empresa) VALUES

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
        id_arquitetura int primary key AUTO_INCREMENT,
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

(1, 'Astra-Mini', 'Intel Xeon E-2378', 4, 16, 'NVIDIA T400', 'Ubuntu Server 22.04 LTS', 500, 1),
(2, 'Astra-Core', 'Intel Xeon E-2388G', 8, 32, 'NVIDIA T1000', 'Ubuntu Server 22.04 LTS', 1000, 1),
(3, 'Vortex-1', 'AMD EPYC 7313P', 16, 64, 'NVIDIA RTX A2000', 'Debian 12', 2000, 1),
(4, 'Vortex-2', 'AMD EPYC 7443', 32, 128, 'NVIDIA RTX A4000', 'Debian 12', 4000, 1),
(5, 'WAPX', 'AMD EPYC 7443', 32, 128, 'NVIDIA GB200', 'Debian 12', 4000, 1);

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
(2, 1, 6), 
(3, 1, 4), 
(4, 1, 2), 
(5, 1, 4), 
(1, 2, 2), 
(2, 2, 2),
(3, 2, 7),
(4, 2, 1),
(1, 3, 2),
(2, 3, 3),
(3, 3, 9);


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
    nome_processo varchar(55),
    data_cadastro DATETIME NOT NULL DEFAULT current_timestamp,
    fk_zona_disponibilidade int,
    fk_arquitetura int,
        foreign key (fk_cliente) references cliente(id_cliente)
        ON DELETE CASCADE,
        foreign key (fk_zona_disponibilidade) references zonadisponibilidade(id_zona)
        ON DELETE SET NULL,
        foreign key (fk_arquitetura) references arquitetura(id_arquitetura)
        ON DELETE SET NULL
);



INSERT INTO modelo (id_modelo, nome, qtd_disco, descricao, ip, hostname, tempo_parametro_min, limite_cpu, limite_disco, limite_ram, limite_gpu, fk_cliente, nome_processo, data_cadastro, fk_zona_disponibilidade, fk_arquitetura) VALUES
-- 5 Modelos para ARQUITETURA 1 (Astra-Mini)
(1, 'NovaQuest', 500, 'Motor de inferência de NLP para triagem de tickets de suporte.', '10.1.1.101', 'SV-SP01-NPL-01', 5, 78.00, 85.00, 80.00, 75.00, 1, 'nlp_worker', '2025-10-10 09:00:00', 1, 1), -- AQUI


(2, 'Fraud-Detector-V2', 500, 'Classificador de transações financeiras suspeitas.', '10.1.1.102', 'SV-SP01-FRD-02', 15, 88.00, 92.00, 90.00, 85.00, 1, 'rt_fraud_engine', '2025-10-25 14:30:00', 1, 1),

(3, 'GenAi', 500, 'Serviço de sugestão de produtos em tempo real (CPU/RAM leve).', '10.1.2.103', 'SV-SP02-REC-03', 10, 75.00, 80.00, 78.00, 70.00, 1, 'reco_service', '2025-11-05 11:00:00', 2, 1), -- AQUI

(4, 'Time-Series-Forecaster', 250, 'Modelo de previsão de séries temporais para preços de energia.', '10.1.2.104', 'SV-SP02-TSF-04', 5, 82.00, 95.00, 85.00, 80.00, 1, 'forecaster_py', '2025-11-15 16:45:00', 2, 1),
(5, 'Simple-Object-Count', 500, 'Contagem simples de objetos em imagens estáticas.', '10.1.1.105', 'SV-SP01-OBJ-05', 10, 85.00, 90.00, 88.00, 88.00, 1, 'vision_proc', '2025-12-01 10:20:00', 1, 1),

-- 5 Modelos para ARQUITETURA 2 (Astra-Core)
(6, 'Med-Image-Scanner', 1000, 'Segmentação de imagens médicas com TensorFlow, alta exigência de GPU.', '10.2.1.201', 'SV-SP01-MED-06', 5, 90.00, 95.00, 88.00, 95.00, 1, 'tf_segment', '2025-10-01 12:00:00', 1, 2),
(7, 'LLM-Custom-3B', 1000, 'Motor de inferência para um Large Language Model proprietário.', '10.2.1.202', 'SV-SP01-LLM-07', 10, 85.00, 90.00, 90.00, 90.00, 1, 'llama_exec', '2025-10-18 17:30:00', 1, 2),
(8, 'Data-Quality-Checker', 1000, 'Processamento de Big Data para validação e qualidade de dados.', '10.2.2.203', 'SV-SP02-DQC-08', 15, 95.00, 88.00, 85.00, 75.00, 1, 'spark_job', '2025-11-08 09:40:00', 2, 2),

(9, 'AlphaStream', 1000, 'Análise de dados geoespaciais e sensoriamento remoto.', '10.2.3.204', 'SV-MG01-GEO-09', 5, 88.00, 95.00, 92.00, 90.00, 1, 'geo_service', '2025-11-22 13:15:00', 3, 2), -- AQUI

(10, 'A/B-Testing-Engine', 1000, 'Serviço de cálculo e otimização de testes A/B.', '10.2.1.205', 'SV-SP01-ABT-10', 10, 85.00, 90.00, 88.00, 85.00, 1, 'opt_engine', '2025-12-04 15:50:00', 1, 2),


-- 5 Modelos para ARQUITETURA 3 (Vortex-1)
(11, 'Quantum-Simulator-V1', 2000, 'Simulador de otimização quântica (exige muita CPU).', '10.3.1.301', 'SV-SP01-QNT-11', 15, 98.00, 90.00, 95.00, 85.00, 1, 'quantum_solver', '2025-10-03 10:00:00', 1, 3),
(12, 'Image-GAN-Generator', 2000, 'Rede Adversária Generativa (GAN) para criar ativos digitais.', '10.3.2.302', 'SV-SP02-GAN-12', 5, 90.00, 92.00, 90.00, 98.00, 1, 'gan_render', '2025-10-22 13:40:00', 2, 3),
(13, 'HPC-Weather-Model', 2000, 'Modelo de previsão do tempo de alto desempenho (RAM e GPU).', '10.3.2.303', 'SV-SP02-WTH-13', 10, 88.00, 95.00, 95.00, 92.00, 1, 'hpc_model', '2025-11-11 10:50:00', 2, 3),
(14, 'Financial-Modeling', 2000, 'Modelagem de risco financeiro complexo (CPU e RAM alta).', '10.3.3.304', 'SV-MG01-FIN-14', 5, 95.00, 90.00, 98.00, 80.00, 1, 'risk_calc', '2025-11-29 08:25:00', 3, 3),

(15, 'DataVault-R5', 2000, 'Pipeline de limpeza e normalização de grandes volumes de dados.', '10.3.3.305', 'SV-MG01-CLD-15', 10, 90.00, 85.00, 90.00, 75.00, 1, 'data_clean', '2025-12-06 17:15:00', 3, 3), -- AQUI

-- 5 Modelos para ARQUITETURA 4 (Vortex-2)

(16, 'FusionEngine', 4000, 'Ambiente de Treinamento de Redes Neurais Profundas, uso máximo de GPU.', '10.4.1.401', 'SV-SP01-DLT-16', 5, 95.00, 98.00, 95.00, 98.00, 1, 'trainer_cuda', '2025-10-07 15:00:00', 1, 4), -- AQUI

(17, 'Massive-Cluster-Proc', 4000, 'Nó de processamento para cluster de Big Data, exige RAM extrema.', '10.4.1.402', 'SV-SP01-MCP-17', 15, 98.00, 95.00, 99.00, 80.00, 1, 'cluster_node', '2025-11-02 10:35:00', 1, 4),
(18, 'Bio-Molecular-Sim', 4000, 'Simulação de dinâmica molecular (alto uso de CPU e GPU).', '10.4.2.403', 'SV-SP02-BMS-18', 10, 90.00, 90.00, 92.00, 95.00, 1, 'mol_sim', '2025-11-19 14:00:00', 2, 4),
(19, 'Experimental-GPU-Lab', 1000, 'Ambiente de laboratório para prototipagem de novos modelos de GPU.', '10.4.1.404', 'SV-SP01-EXP-19', 5, 85.00, 80.00, 85.00, 90.00, 1, 'proto_lab', '2025-12-02 11:20:00', 1, 4),

(20, 'QuantumLeap', 4000, 'Gerenciador de arquivos de dados históricos (uso intenso de Disco).', '10.4.1.405', 'SV-SP01-DAM-20', 15, 80.00, 99.00, 80.00, 75.00, 1, 'IAsmin', '2025-12-10 16:00:00', 1, 4), -- AQUI

-- 5 Modelos para ARQUITETURA 5 (WAPX)
(21, 'AetherLink', 4000, 'Serviço central de infraestrutura e orquestração de microserviços de IA.', '10.5.1.501', 'SV-SP01-INF-21', 5, 90.00, 90.00, 92.00, 95.00, 1, 'k8s_agent', '2025-10-14 09:30:00', 1, 5), -- aQUI

(22, 'EchoProcessor', 4000, 'Processamento de feeds de vídeo em tempo real (baixa latência).', '10.5.1.502', 'SV-SP01-RTF-22', 10, 95.00, 95.00, 90.00, 98.00, 1, 'echoo', '2025-10-31 10:00:00', 1, 5), -- AQUI

(23, 'Financial-Data-Prep', 4000, 'Preparação de dados financeiros para modelos de trading.', '10.5.1.503', 'SV-SP01-TRD-23', 5, 88.00, 90.00, 95.00, 85.00, 1, 'prepeia', '2025-11-09 13:00:00', 1, 5),

(24, 'DeepMind-X', 4000, 'Motor de inferência de altíssima performance para modelos massivos.', '10.5.1.504', 'SV-SP01-ULT-24', 15, 98.00, 98.00, 98.00, 99.00, 1, 'mega_infer', '2025-11-24 15:45:00', 1, 5), -- AQUI

(25, 'QuantumLeap', 4000, 'Modelo de Machine Learning para detecção de ameaças de segurança.', '10.5.1.505', 'SV-SP01-SEC-25', 10, 90.00, 95.00, 90.00, 90.00, 1, 'sec_engine', '2025-12-07 14:20:00', 1, 5);  -- AQUI



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



CREATE TABLE whitelist (
    id_processo INT AUTO_INCREMENT,
    fk_modelo INT,
    nome VARCHAR(70),
    matar BOOLEAN,
    PRIMARY KEY (id_processo, fk_modelo),
    FOREIGN KEY (fk_modelo) REFERENCES modelo(id_modelo)
    ON DELETE CASCADE,
	CONSTRAINT UQ_modelo_processo UNIQUE (fk_modelo, nome)
);

INSERT INTO whitelist (fk_modelo, nome) VALUES
(1, 'System'),
(1, 'explorer.exe'),
(1, 'python.exe'),
(1, 'mysqld.exe'),
(1, 'chrome.exe'),
(1, 'svchost.exe'),
(1, 'cmd.exe'),
(1, 'code.exe'),     
(1, 'docker.exe'),
(1, 'idea64.exe'),      
(1, 'Discord.exe');




CREATE TABLE log_processos (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50), 
    dataKill DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_modelo INT,
    FOREIGN KEY (fk_modelo) REFERENCES modelo(id_modelo)
);

INSERT INTO log_processos (nome, dataKill, fk_modelo) VALUES 
('python_worker',       '2025-11-02 23:12:00', 1),
('triton_inference_server', '2025-11-02 09:15:00', 1),
('tensor_runtime',      '2025-10-31 10:00:00', 1),
('cuda_driver',         '2025-10-31 10:45:00', 1),
('redis-server',        '2025-10-29 11:30:00', 1),
('nginx',               '2025-10-27 12:15:00', 1),
('prometheus',          '2025-10-27 13:00:00', 1),
('grafana-server',      '2025-10-20 13:45:00', 1);
