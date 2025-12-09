const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  sessionToken: process.env.aws_session_token,
});

async function lerArquivo(req, res) {
  try {
    const fileKey = req.params.pasta
      ? `${req.params.arquivo}/${req.params.pasta}`
      : `${req.params.arquivo}`;
    console.log("Buscando arquivo S3:", fileKey);
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
    };
    const data = await s3.getObject(params).promise();
    const text = data.Body.toString("utf-8").trim();
    res.json(JSON.parse(text));
    return;
  } catch (err) {
    try {
      res.json({
        empresas: [
          {
            idEmpresas: 1,
            ativo: 1,
            nome: "Tech Soluções LTDA",
            zonas: [
              {
                Arquitetura_idArquitetura: 1,
                nome: "us-east-1a",
                Modelo_idModelo: 1,
                arquiteturas: [
                  {
                    qtd_DISCO: 1,
                    idArquitetura: 1,
                    CPU: 4,
                    DISCO: 256,
                    SO: "Linux",
                    GPU: 0,
                    RAM: 16,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-a1",
                    qtd_DISCO: 1,
                    processo: "Treinamento",
                    ip: "10.0.0.1",
                    nome: "Model-A1",
                    whitelists: [
                      {
                        nome: null,
                        Modelo_idModelo: 1,
                      },
                    ],
                    slas: [
                      {
                        qtd_DISCO: 1,
                        CPU: 4,
                        DISCO: 256,
                        Modelo_idModelo: 1,
                        GPU: 0,
                        RAM: 16,
                      },
                    ],
                    tickets: [
                      {
                        id: "10427",
                        self: "https://cortexsptech.atlassian.net/rest/api/3/issue/10427",
                        key: "CTX-64",
                        fields: {
                          issuetype: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issuetype/10014",
                            id: "10014",
                          },
                          project: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/project/10001",
                            id: "10001",
                            key: "CTX",
                          },
                          statusCategory: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/4",
                            id: 4,
                            key: "indeterminate",
                          },
                          watches: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-64/watchers",
                          },
                          customfield_10060: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10037",
                            id: "10037",
                          },
                          created: "2025-12-08T03:45:38.975-0300",
                          priority: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/priority/3",
                            id: "3",
                          },
                          labels: ["cpu", "ram"],
                          assignee: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ab10e3d25-dd0f-4f34-8625-a71259bec937",
                          },
                          updated: "2025-12-08T03:45:56.727-0300",
                          status: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/status/3",
                            id: "3",
                            statusCategory: {
                              self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/4",
                              id: 4,
                              key: "indeterminate",
                            },
                          },
                          customfield_10093: "1;1;1",
                          description: {
                            content: [
                              {
                                content: [
                                  {
                                    text: "Alerta de Utilização Crítica - Cortex",
                                  },
                                  {
                                    text: "O modelo: NovaQuest - na máquina: SV-SP01-NPL-01 ultrapassou o limite crítico de:",
                                  },
                                  {
                                    text: "        - cpu  - com o uso de: 99% - em: 2025-12-07_19-30-05",
                                  },
                                  {
                                    text: "        - ram - com o uso de: 90% - em: 2025-12-08_09-33-02",
                                  },
                                ],
                              },
                            ],
                          },
                          customfield_10059: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10035",
                            value: "Incidente",
                            id: "10035",
                          },
                          summary:
                            "ALERTA CRÍTICO: Modelo NovaQuest Máquina SV-SP01-NPL-01 - Última Atualização 2025-12-07_19-30-05",
                          creator: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ab10e3d25-dd0f-4f34-8625-a71259bec937",
                          },
                          reporter: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ad7af09bf-73f1-46ad-aaf5-657c7eda178f",
                          },
                          customfield_10044: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10022",
                            id: "10022",
                          },
                          votes: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-64/votes",
                          },
                        },
                      },
                      {
                        id: "10424",
                        self: "https://cortexsptech.atlassian.net/rest/api/3/issue/10424",
                        key: "CTX-61",
                        fields: {
                          issuetype: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issuetype/10014",
                            id: "10014",
                          },
                          project: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/project/10001",
                            id: "10001",
                            key: "CTX",
                          },
                          statusCategory: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/2",
                            id: 2,
                            key: "new",
                          },
                          watches: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-61/watchers",
                          },
                          customfield_10060: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10036",
                            id: "10036",
                          },
                          created: "2025-12-08T03:35:56.055-0300",
                          priority: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/priority/2",
                            id: "2",
                          },
                          labels: ["cpu", "ram"],
                          updated: "2025-12-08T03:43:44.345-0300",
                          status: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/status/1",
                            id: "1",
                            statusCategory: {
                              self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/2",
                              id: 2,
                              key: "new",
                            },
                          },
                          customfield_10093: "1;1;1",
                          description: {
                            content: [
                              {
                                content: [
                                  {
                                    text: "Alerta de Utilização Crítica - Cortex\nO modelo: NovaQuest - na máquina: SV-SP01-NPL-01 ultrapassou o limite crítico de:\n        - cpu  - com o uso de: 90% - em: 2025-12-08_09-30-02\n        - ram - com o uso de: 90% - em: 2025-12-08_09-33-02",
                                  },
                                ],
                              },
                            ],
                          },
                          customfield_10059: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10035",
                            value: "Incidente",
                            id: "10035",
                          },
                          summary:
                            "ALERTA CRÍTICO: Modelo NovaQuest Máquina SV-SP01-NPL-01 - Última Atualização 2025-12-08_09-30-05",
                          creator: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ab10e3d25-dd0f-4f34-8625-a71259bec937",
                          },
                          reporter: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ad7af09bf-73f1-46ad-aaf5-657c7eda178f",
                          },
                          customfield_10044: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10021",
                            id: "10021",
                          },
                          votes: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-61/votes",
                          },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                Arquitetura_idArquitetura: 2,
                nome: "us-east-1a",
                Modelo_idModelo: 1,
                arquiteturas: [
                  {
                    qtd_DISCO: 2,
                    idArquitetura: 2,
                    CPU: 8,
                    DISCO: 512,
                    SO: "Linux",
                    GPU: 4,
                    RAM: 32,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-a1",
                    qtd_DISCO: 1,
                    processo: "Treinamento",
                    ip: "10.0.0.1",
                    nome: "Model-A1",
                    whitelists: [
                      {
                        nome: null,
                        Modelo_idModelo: 1,
                      },
                    ],
                    slas: [
                      {
                        qtd_DISCO: 1,
                        CPU: 4,
                        DISCO: 256,
                        Modelo_idModelo: 1,
                        GPU: 0,
                        RAM: 16,
                      },
                    ],
                    tickets: [
                      {
                        id: "10427",
                        self: "https://cortexsptech.atlassian.net/rest/api/3/issue/10427",
                        key: "CTX-64",
                        fields: {
                          issuetype: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issuetype/10014",
                            id: "10014",
                          },
                          project: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/project/10001",
                            id: "10001",
                            key: "CTX",
                          },
                          statusCategory: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/4",
                            id: 4,
                            key: "indeterminate",
                          },
                          watches: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-64/watchers",
                          },
                          customfield_10060: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10037",
                            id: "10037",
                          },
                          created: "2025-12-08T03:45:38.975-0300",
                          priority: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/priority/3",
                            id: "3",
                          },
                          labels: ["cpu", "ram"],
                          assignee: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ab10e3d25-dd0f-4f34-8625-a71259bec937",
                          },
                          updated: "2025-12-08T03:45:56.727-0300",
                          status: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/status/3",
                            id: "3",
                            statusCategory: {
                              self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/4",
                              id: 4,
                              key: "indeterminate",
                            },
                          },
                          customfield_10093: "1;1;1",
                          description: {
                            content: [
                              {
                                content: [
                                  {
                                    text: "Alerta de Utilização Crítica - Cortex",
                                  },
                                  {
                                    text: "O modelo: NovaQuest - na máquina: SV-SP01-NPL-01 ultrapassou o limite crítico de:",
                                  },
                                  {
                                    text: "        - cpu  - com o uso de: 99% - em: 2025-12-07_19-30-05",
                                  },
                                  {
                                    text: "        - ram - com o uso de: 90% - em: 2025-12-08_09-33-02",
                                  },
                                ],
                              },
                            ],
                          },
                          customfield_10059: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10035",
                            value: "Incidente",
                            id: "10035",
                          },
                          summary:
                            "ALERTA CRÍTICO: Modelo NovaQuest Máquina SV-SP01-NPL-01 - Última Atualização 2025-12-07_19-30-05",
                          creator: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ab10e3d25-dd0f-4f34-8625-a71259bec937",
                          },
                          reporter: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ad7af09bf-73f1-46ad-aaf5-657c7eda178f",
                          },
                          customfield_10044: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10022",
                            id: "10022",
                          },
                          votes: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-64/votes",
                          },
                        },
                      },
                      {
                        id: "10424",
                        self: "https://cortexsptech.atlassian.net/rest/api/3/issue/10424",
                        key: "CTX-61",
                        fields: {
                          issuetype: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issuetype/10014",
                            id: "10014",
                          },
                          project: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/project/10001",
                            id: "10001",
                            key: "CTX",
                          },
                          statusCategory: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/2",
                            id: 2,
                            key: "new",
                          },
                          watches: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-61/watchers",
                          },
                          customfield_10060: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10036",
                            id: "10036",
                          },
                          created: "2025-12-08T03:35:56.055-0300",
                          priority: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/priority/2",
                            id: "2",
                          },
                          labels: ["cpu", "ram"],
                          updated: "2025-12-08T03:43:44.345-0300",
                          status: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/status/1",
                            id: "1",
                            statusCategory: {
                              self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/2",
                              id: 2,
                              key: "new",
                            },
                          },
                          customfield_10093: "1;1;1",
                          description: {
                            content: [
                              {
                                content: [
                                  {
                                    text: "Alerta de Utilização Crítica - Cortex\nO modelo: NovaQuest - na máquina: SV-SP01-NPL-01 ultrapassou o limite crítico de:\n        - cpu  - com o uso de: 90% - em: 2025-12-08_09-30-02\n        - ram - com o uso de: 90% - em: 2025-12-08_09-33-02",
                                  },
                                ],
                              },
                            ],
                          },
                          customfield_10059: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10035",
                            value: "Incidente",
                            id: "10035",
                          },
                          summary:
                            "ALERTA CRÍTICO: Modelo NovaQuest Máquina SV-SP01-NPL-01 - Última Atualização 2025-12-08_09-30-05",
                          creator: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ab10e3d25-dd0f-4f34-8625-a71259bec937",
                          },
                          reporter: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ad7af09bf-73f1-46ad-aaf5-657c7eda178f",
                          },
                          customfield_10044: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10021",
                            id: "10021",
                          },
                          votes: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-61/votes",
                          },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                Arquitetura_idArquitetura: 1,
                nome: "us-east-1b",
                Modelo_idModelo: 2,
                arquiteturas: [
                  {
                    qtd_DISCO: 1,
                    idArquitetura: 1,
                    CPU: 4,
                    DISCO: 256,
                    SO: "Linux",
                    GPU: 0,
                    RAM: 16,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-a2",
                    qtd_DISCO: 2,
                    processo: "Inferencia",
                    ip: "192.168.1.10",
                    nome: "Model-A2",
                    whitelists: [
                      {
                        nome: null,
                        Modelo_idModelo: 2,
                      },
                    ],
                    slas: [
                      {
                        qtd_DISCO: 2,
                        CPU: 8,
                        DISCO: 512,
                        Modelo_idModelo: 2,
                        GPU: 2,
                        RAM: 32,
                      },
                    ],
                    alertas: [
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: DEEPMIND-X\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: DEEPMIND-X\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: SENTINELGUARD\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: SENTINELGUARD\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: QUANTUMLEAP\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ECHOPROCESSOR\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: DEEPMIND-X\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: DEEPMIND-X\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: AETHERLINK\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: SENTINELGUARD\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: SENTINELGUARD\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: ALPHASTREAM\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: CRÍTICO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: CRÍTICO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: GENAI\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nDISCO: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nRAM: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: FUSIONENGINE\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nCPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: "Tipo: ATENÇÃO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                        bot_profile: {
                          id: "B0A1U8TEK97",
                          updated: 1764816011,
                        },
                        blocks: [
                          {
                            elements: [
                              {
                                elements: [
                                  {
                                    text: "Tipo: ATENÇÃO!\nModelo: NOVAQUEST\nHostname: DESKTOP-RICHARDBARRETO\nIp: 192.168.1.10\nGPU: 80%\nData: 2025-12-06_13-30-59",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    medicao: [
                      {
                        "2025-12-07_19-25-30": {
                          Time: "2025-12-07_19-25-30",
                          cpu: 12.9,
                          ram: 40.6,
                          storage: 88.2,
                          discoUso: 0.2,
                          gpu: 0.16,
                        },
                        "2025-12-07_19-26-40": {
                          Time: "2025-12-07_19-26-40",
                          cpu: 7.5,
                          ram: 40.6,
                          storage: 88.2,
                          discoUso: 0.2,
                          gpu: 0.49,
                        },
                        "2025-12-07_19-27-50": {
                          Time: "2025-12-07_19-27-50",
                          cpu: 8.0,
                          ram: 40.6,
                          storage: 88.2,
                          discoUso: 0.2,
                          gpu: 9.63,
                        },
                        "2025-12-07_19-29-01": {
                          Time: "2025-12-07_19-29-01",
                          cpu: 15.2,
                          ram: 40.6,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 47.75,
                        },
                        "2025-12-07_19-30-12": {
                          Time: "2025-12-07_19-30-12",
                          cpu: 29.0,
                          ram: 40.7,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 0.03,
                        },
                      },
                      {
                        "2025-12-07_19-31-23": {
                          Time: "2025-12-07_19-31-23",
                          cpu: 9.5,
                          ram: 41.0,
                          storage: 88.2,
                          discoUso: 0.3,
                          gpu: 0.48,
                        },
                        "2025-12-07_19-32-31": {
                          Time: "2025-12-07_19-32-31",
                          cpu: 13.3,
                          ram: 40.6,
                          storage: 88.2,
                          discoUso: 0.3,
                          gpu: 20.18,
                        },
                        "2025-12-07_19-33-39": {
                          Time: "2025-12-07_19-33-39",
                          cpu: 8.2,
                          ram: 40.9,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 2.35,
                        },
                        "2025-12-07_19-34-47": {
                          Time: "2025-12-07_19-34-47",
                          cpu: 5.9,
                          ram: 40.5,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 0.09,
                        },
                        "2025-12-07_19-35-55": {
                          Time: "2025-12-07_19-35-55",
                          cpu: 6.5,
                          ram: 40.5,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 0.56,
                        },
                      },
                      {
                        "2025-12-07_19-37-04": {
                          Time: "2025-12-07_19-37-04",
                          cpu: 7.8,
                          ram: 40.7,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 2.55,
                        },
                        "2025-12-07_19-38-12": {
                          Time: "2025-12-07_19-38-12",
                          cpu: 8.8,
                          ram: 41.3,
                          storage: 88.2,
                          discoUso: 0.3,
                          gpu: 9.27,
                        },
                        "2025-12-07_19-39-20": {
                          Time: "2025-12-07_19-39-20",
                          cpu: 7.3,
                          ram: 39.7,
                          storage: 88.2,
                          discoUso: 0.0,
                          gpu: 1.27,
                        },
                        "2025-12-07_19-40-28": {
                          Time: "2025-12-07_19-40-28",
                          cpu: 11.4,
                          ram: 39.8,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 0.22,
                        },
                        "2025-12-07_19-41-36": {
                          Time: "2025-12-07_19-41-36",
                          cpu: 12.8,
                          ram: 40.1,
                          storage: 88.2,
                          discoUso: 1.4,
                          gpu: 0.5,
                        },
                      },
                      {
                        "2025-12-07_19-42-45": {
                          Time: "2025-12-07_19-42-45",
                          cpu: 9.5,
                          ram: 39.0,
                          storage: 88.2,
                          discoUso: 0.2,
                          gpu: 2.94,
                        },
                        "2025-12-07_19-43-51": {
                          Time: "2025-12-07_19-43-51",
                          cpu: 9.0,
                          ram: 38.9,
                          storage: 88.2,
                          discoUso: 0.2,
                          gpu: 0.48,
                        },
                        "2025-12-07_19-44-58": {
                          Time: "2025-12-07_19-44-58",
                          cpu: 7.5,
                          ram: 39.0,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 3.9,
                        },
                        "2025-12-07_19-46-04": {
                          Time: "2025-12-07_19-46-04",
                          cpu: 7.0,
                          ram: 39.8,
                          storage: 88.2,
                          discoUso: 0.8,
                          gpu: 5.88,
                        },
                        "2025-12-07_19-47-11": {
                          Time: "2025-12-07_19-47-11",
                          cpu: 5.6,
                          ram: 39.5,
                          storage: 88.2,
                          discoUso: 0.3,
                          gpu: 4.69,
                        },
                      },
                      {
                        "2025-12-07_19-48-19": {
                          Time: "2025-12-07_19-48-19",
                          cpu: 8.1,
                          ram: 39.8,
                          storage: 88.2,
                          discoUso: 0.0,
                          gpu: 3.31,
                        },
                        "2025-12-07_19-49-26": {
                          Time: "2025-12-07_19-49-26",
                          cpu: 10.6,
                          ram: 39.7,
                          storage: 88.2,
                          discoUso: 0.2,
                          gpu: 3.41,
                        },
                        "2025-12-07_19-50-32": {
                          Time: "2025-12-07_19-50-32",
                          cpu: 7.3,
                          ram: 40.0,
                          storage: 88.2,
                          discoUso: 0.0,
                          gpu: 4.48,
                        },
                        "2025-12-07_19-51-39": {
                          Time: "2025-12-07_19-51-39",
                          cpu: 6.9,
                          ram: 39.7,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 0.92,
                        },
                        "2025-12-07_19-52-45": {
                          Time: "2025-12-07_19-52-45",
                          cpu: 9.7,
                          ram: 39.7,
                          storage: 88.2,
                          discoUso: 0.2,
                          gpu: 4.18,
                        },
                      },
                      {
                        "2025-12-07_19-53-53": {
                          Time: "2025-12-07_19-53-53",
                          cpu: 8.3,
                          ram: 39.6,
                          storage: 88.2,
                          discoUso: 0.1,
                          gpu: 0.03,
                        },
                        "2025-12-07_19-55-00": {
                          Time: "2025-12-07_19-55-00",
                          cpu: 11.0,
                          ram: 39.7,
                          storage: 88.2,
                          discoUso: 0.0,
                          gpu: 14.26,
                        },
                        "2025-12-07_19-56-07": {
                          Time: "2025-12-07_19-56-07",
                          cpu: 10.4,
                          ram: 40.5,
                          storage: 88.2,
                          discoUso: 0.3,
                          gpu: 9.88,
                        },
                        "2025-12-07_19-57-14": {
                          Time: "2025-12-07_19-57-14",
                          cpu: 14.3,
                          ram: 40.0,
                          storage: 88.3,
                          discoUso: 23.7,
                          gpu: 1.3,
                        },
                        "2025-12-07_19-58-22": {
                          Time: "2025-12-07_19-58-22",
                          cpu: 11.9,
                          ram: 40.1,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 2.75,
                        },
                      },
                      {
                        "2025-12-07_19-59-31": {
                          Time: "2025-12-07_19-59-31",
                          cpu: 11.5,
                          ram: 39.8,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.18,
                        },
                        "2025-12-07_20-00-38": {
                          Time: "2025-12-07_20-00-38",
                          cpu: 11.3,
                          ram: 40.0,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.08,
                        },
                        "2025-12-07_20-01-45": {
                          Time: "2025-12-07_20-01-45",
                          cpu: 6.9,
                          ram: 39.4,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 0.1,
                        },
                        "2025-12-07_20-02-52": {
                          Time: "2025-12-07_20-02-52",
                          cpu: 5.9,
                          ram: 39.6,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 5.94,
                        },
                        "2025-12-07_20-03-58": {
                          Time: "2025-12-07_20-03-58",
                          cpu: 9.4,
                          ram: 40.1,
                          storage: 88.3,
                          discoUso: 0.3,
                          gpu: 0.38,
                        },
                      },
                      {
                        "2025-12-07_20-05-07": {
                          Time: "2025-12-07_20-05-07",
                          cpu: 6.7,
                          ram: 40.0,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.16,
                        },
                        "2025-12-07_20-06-14": {
                          Time: "2025-12-07_20-06-14",
                          cpu: 7.4,
                          ram: 40.3,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.11,
                        },
                        "2025-12-07_20-07-21": {
                          Time: "2025-12-07_20-07-21",
                          cpu: 8.6,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 1.54,
                        },
                        "2025-12-07_20-08-28": {
                          Time: "2025-12-07_20-08-28",
                          cpu: 6.2,
                          ram: 40.6,
                          storage: 88.3,
                          discoUso: 0.3,
                          gpu: 0.54,
                        },
                        "2025-12-07_20-09-35": {
                          Time: "2025-12-07_20-09-35",
                          cpu: 10.1,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 2.8,
                        },
                      },
                      {
                        "2025-12-07_20-10-44": {
                          Time: "2025-12-07_20-10-44",
                          cpu: 5.0,
                          ram: 40.6,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.66,
                        },
                        "2025-12-07_20-11-51": {
                          Time: "2025-12-07_20-11-51",
                          cpu: 5.6,
                          ram: 40.5,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.35,
                        },
                        "2025-12-07_20-12-58": {
                          Time: "2025-12-07_20-12-58",
                          cpu: 3.9,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.84,
                        },
                        "2025-12-07_20-14-05": {
                          Time: "2025-12-07_20-14-05",
                          cpu: 10.4,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 7.84,
                        },
                        "2025-12-07_20-15-12": {
                          Time: "2025-12-07_20-15-12",
                          cpu: 12.4,
                          ram: 40.8,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.17,
                        },
                      },
                      {
                        "2025-12-07_20-16-21": {
                          Time: "2025-12-07_20-16-21",
                          cpu: 8.4,
                          ram: 40.5,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 7.12,
                        },
                        "2025-12-07_20-17-29": {
                          Time: "2025-12-07_20-17-29",
                          cpu: 7.8,
                          ram: 40.4,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 7.83,
                        },
                        "2025-12-07_20-18-36": {
                          Time: "2025-12-07_20-18-36",
                          cpu: 8.6,
                          ram: 40.5,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 1.68,
                        },
                        "2025-12-07_20-19-43": {
                          Time: "2025-12-07_20-19-43",
                          cpu: 5.3,
                          ram: 40.5,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 1.56,
                        },
                        "2025-12-07_20-20-50": {
                          Time: "2025-12-07_20-20-50",
                          cpu: 8.5,
                          ram: 40.4,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.09,
                        },
                      },
                      {
                        "2025-12-07_20-21-58": {
                          Time: "2025-12-07_20-21-58",
                          cpu: 8.0,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 4.18,
                        },
                        "2025-12-07_20-23-06": {
                          Time: "2025-12-07_20-23-06",
                          cpu: 6.0,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.15,
                        },
                        "2025-12-07_20-24-13": {
                          Time: "2025-12-07_20-24-13",
                          cpu: 10.0,
                          ram: 40.8,
                          storage: 88.3,
                          discoUso: 0.4,
                          gpu: 0.09,
                        },
                        "2025-12-07_20-25-20": {
                          Time: "2025-12-07_20-25-20",
                          cpu: 6.4,
                          ram: 40.6,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 7.11,
                        },
                        "2025-12-07_20-26-27": {
                          Time: "2025-12-07_20-26-27",
                          cpu: 7.0,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 2.48,
                        },
                      },
                      {
                        "2025-12-07_20-27-36": {
                          Time: "2025-12-07_20-27-36",
                          cpu: 10.0,
                          ram: 40.8,
                          storage: 88.3,
                          discoUso: 1.5,
                          gpu: 3.13,
                        },
                        "2025-12-07_20-28-42": {
                          Time: "2025-12-07_20-28-42",
                          cpu: 7.1,
                          ram: 40.8,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 1.23,
                        },
                        "2025-12-07_20-29-49": {
                          Time: "2025-12-07_20-29-49",
                          cpu: 5.9,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.17,
                        },
                        "2025-12-07_20-30-56": {
                          Time: "2025-12-07_20-30-56",
                          cpu: 3.1,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.13,
                        },
                        "2025-12-07_20-32-03": {
                          Time: "2025-12-07_20-32-03",
                          cpu: 3.0,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 0.11,
                        },
                      },
                      {
                        "2025-12-07_20-33-11": {
                          Time: "2025-12-07_20-33-11",
                          cpu: 2.9,
                          ram: 40.8,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.11,
                        },
                        "2025-12-07_20-34-18": {
                          Time: "2025-12-07_20-34-18",
                          cpu: 5.0,
                          ram: 40.9,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.09,
                        },
                        "2025-12-07_20-35-24": {
                          Time: "2025-12-07_20-35-24",
                          cpu: 6.2,
                          ram: 40.7,
                          storage: 88.3,
                          discoUso: 1.2,
                          gpu: 9.47,
                        },
                        "2025-12-07_20-36-31": {
                          Time: "2025-12-07_20-36-31",
                          cpu: 11.9,
                          ram: 41.1,
                          storage: 88.3,
                          discoUso: 0.3,
                          gpu: 9.74,
                        },
                        "2025-12-07_20-37-38": {
                          Time: "2025-12-07_20-37-38",
                          cpu: 12.0,
                          ram: 41.4,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 2.83,
                        },
                      },
                      {
                        "2025-12-07_20-38-47": {
                          Time: "2025-12-07_20-38-47",
                          cpu: 7.3,
                          ram: 41.4,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 26.84,
                        },
                        "2025-12-07_20-39-54": {
                          Time: "2025-12-07_20-39-54",
                          cpu: 14.5,
                          ram: 39.4,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 12.11,
                        },
                        "2025-12-07_20-41-02": {
                          Time: "2025-12-07_20-41-02",
                          cpu: 10.2,
                          ram: 39.0,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 12.73,
                        },
                        "2025-12-07_20-42-08": {
                          Time: "2025-12-07_20-42-08",
                          cpu: 9.4,
                          ram: 38.8,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 12.58,
                        },
                        "2025-12-07_20-43-15": {
                          Time: "2025-12-07_20-43-15",
                          cpu: 8.2,
                          ram: 39.2,
                          storage: 88.3,
                          discoUso: 0.4,
                          gpu: 9.6,
                        },
                      },
                      {
                        "2025-12-07_20-44-24": {
                          Time: "2025-12-07_20-44-24",
                          cpu: 14.1,
                          ram: 39.6,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 12.62,
                        },
                        "2025-12-07_20-45-31": {
                          Time: "2025-12-07_20-45-31",
                          cpu: 9.0,
                          ram: 39.4,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 17.52,
                        },
                        "2025-12-07_20-46-39": {
                          Time: "2025-12-07_20-46-39",
                          cpu: 10.5,
                          ram: 39.3,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 3.39,
                        },
                        "2025-12-07_20-47-46": {
                          Time: "2025-12-07_20-47-46",
                          cpu: 10.3,
                          ram: 39.2,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 10.36,
                        },
                        "2025-12-07_20-48-53": {
                          Time: "2025-12-07_20-48-53",
                          cpu: 6.9,
                          ram: 38.9,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.09,
                        },
                      },
                      {
                        "2025-12-07_20-50-01": {
                          Time: "2025-12-07_20-50-01",
                          cpu: 4.1,
                          ram: 38.9,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 0.38,
                        },
                        "2025-12-07_20-51-07": {
                          Time: "2025-12-07_20-51-07",
                          cpu: 5.7,
                          ram: 39.0,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.42,
                        },
                        "2025-12-07_20-52-13": {
                          Time: "2025-12-07_20-52-13",
                          cpu: 6.4,
                          ram: 38.7,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.15,
                        },
                        "2025-12-07_20-53-20": {
                          Time: "2025-12-07_20-53-20",
                          cpu: 6.5,
                          ram: 38.8,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 0.14,
                        },
                        "2025-12-07_20-54-26": {
                          Time: "2025-12-07_20-54-26",
                          cpu: 6.6,
                          ram: 38.6,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 0.17,
                        },
                      },
                      {
                        "2025-12-07_20-55-35": {
                          Time: "2025-12-07_20-55-35",
                          cpu: 9.8,
                          ram: 39.4,
                          storage: 88.3,
                          discoUso: 0.3,
                          gpu: 1.2,
                        },
                        "2025-12-07_20-56-41": {
                          Time: "2025-12-07_20-56-41",
                          cpu: 8.5,
                          ram: 38.5,
                          storage: 88.3,
                          discoUso: 1.0,
                          gpu: 3.9,
                        },
                        "2025-12-07_20-57-48": {
                          Time: "2025-12-07_20-57-48",
                          cpu: 8.9,
                          ram: 38.8,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.76,
                        },
                        "2025-12-07_20-58-54": {
                          Time: "2025-12-07_20-58-54",
                          cpu: 7.2,
                          ram: 38.8,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 3.24,
                        },
                        "2025-12-07_21-00-01": {
                          Time: "2025-12-07_21-00-01",
                          cpu: 5.1,
                          ram: 38.8,
                          storage: 88.3,
                          discoUso: 0.2,
                          gpu: 0.81,
                        },
                      },
                      {
                        "2025-12-07_21-01-09": {
                          Time: "2025-12-07_21-01-09",
                          cpu: 6.2,
                          ram: 38.9,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 1.77,
                        },
                        "2025-12-07_21-02-15": {
                          Time: "2025-12-07_21-02-15",
                          cpu: 5.1,
                          ram: 38.6,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.09,
                        },
                        "2025-12-07_21-03-22": {
                          Time: "2025-12-07_21-03-22",
                          cpu: 7.5,
                          ram: 39.4,
                          storage: 88.3,
                          discoUso: 0.1,
                          gpu: 0.03,
                        },
                        "2025-12-07_21-04-28": {
                          Time: "2025-12-07_21-04-28",
                          cpu: 4.1,
                          ram: 38.9,
                          storage: 88.3,
                          discoUso: 0.0,
                          gpu: 0.09,
                        },
                        "2025-12-07_21-05-34": {
                          Time: "2025-12-07_21-05-34",
                          cpu: 4.4,
                          ram: 38.8,
                          storage: 88.4,
                          discoUso: 1.2,
                          gpu: 0.15,
                        },
                      },
                      {
                        "2025-12-07_21-06-42": {
                          Time: "2025-12-07_21-06-42",
                          cpu: 6.7,
                          ram: 38.9,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 0.03,
                        },
                        "2025-12-07_21-07-49": {
                          Time: "2025-12-07_21-07-49",
                          cpu: 6.6,
                          ram: 39.3,
                          storage: 88.4,
                          discoUso: 0.4,
                          gpu: 0.09,
                        },
                        "2025-12-07_21-08-55": {
                          Time: "2025-12-07_21-08-55",
                          cpu: 5.4,
                          ram: 38.9,
                          storage: 88.4,
                          discoUso: 0.0,
                          gpu: 7.42,
                        },
                        "2025-12-07_21-10-01": {
                          Time: "2025-12-07_21-10-01",
                          cpu: 9.4,
                          ram: 38.8,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 2.3,
                        },
                        "2025-12-07_21-11-08": {
                          Time: "2025-12-07_21-11-08",
                          cpu: 9.9,
                          ram: 38.9,
                          storage: 88.4,
                          discoUso: 0.7,
                          gpu: 0.17,
                        },
                      },
                      {
                        "2025-12-07_21-12-17": {
                          Time: "2025-12-07_21-12-17",
                          cpu: 7.2,
                          ram: 39.0,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 1.25,
                        },
                        "2025-12-07_21-13-23": {
                          Time: "2025-12-07_21-13-23",
                          cpu: 6.3,
                          ram: 39.0,
                          storage: 88.4,
                          discoUso: 0.2,
                          gpu: 0.36,
                        },
                        "2025-12-07_21-14-30": {
                          Time: "2025-12-07_21-14-30",
                          cpu: 7.9,
                          ram: 39.2,
                          storage: 88.4,
                          discoUso: 0.0,
                          gpu: 2.46,
                        },
                        "2025-12-07_21-15-36": {
                          Time: "2025-12-07_21-15-36",
                          cpu: 6.8,
                          ram: 39.1,
                          storage: 88.4,
                          discoUso: 0.2,
                          gpu: 0.02,
                        },
                        "2025-12-07_21-16-43": {
                          Time: "2025-12-07_21-16-43",
                          cpu: 9.0,
                          ram: 39.4,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 6.41,
                        },
                      },
                      {
                        "2025-12-07_21-17-52": {
                          Time: "2025-12-07_21-17-52",
                          cpu: 12.9,
                          ram: 39.2,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 7.27,
                        },
                        "2025-12-07_21-18-59": {
                          Time: "2025-12-07_21-18-59",
                          cpu: 13.9,
                          ram: 40.5,
                          storage: 88.4,
                          discoUso: 0.3,
                          gpu: 0.5,
                        },
                        "2025-12-07_21-20-06": {
                          Time: "2025-12-07_21-20-06",
                          cpu: 5.2,
                          ram: 39.6,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 0.75,
                        },
                        "2025-12-07_21-21-13": {
                          Time: "2025-12-07_21-21-13",
                          cpu: 5.8,
                          ram: 39.9,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 3.0,
                        },
                        "2025-12-07_21-22-19": {
                          Time: "2025-12-07_21-22-19",
                          cpu: 6.0,
                          ram: 39.5,
                          storage: 88.4,
                          discoUso: 0.2,
                          gpu: 2.91,
                        },
                      },
                      {
                        "2025-12-07_21-23-28": {
                          Time: "2025-12-07_21-23-28",
                          cpu: 7.9,
                          ram: 40.1,
                          storage: 88.4,
                          discoUso: 0.2,
                          gpu: 0.95,
                        },
                      },
                      {
                        "2025-12-07_21-27-44": {
                          Time: "2025-12-07_21-27-44",
                          cpu: 8.4,
                          ram: 34.9,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 0.09,
                        },
                        "2025-12-07_21-28-51": {
                          Time: "2025-12-07_21-28-51",
                          cpu: 3.7,
                          ram: 34.8,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 0.1,
                        },
                        "2025-12-07_21-29-57": {
                          Time: "2025-12-07_21-29-57",
                          cpu: 3.8,
                          ram: 34.7,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 0.09,
                        },
                        "2025-12-07_21-31-04": {
                          Time: "2025-12-07_21-31-04",
                          cpu: 7.9,
                          ram: 34.9,
                          storage: 88.4,
                          discoUso: 0.0,
                          gpu: 18.59,
                        },
                        "2025-12-07_21-32-10": {
                          Time: "2025-12-07_21-32-10",
                          cpu: 6.2,
                          ram: 35.0,
                          storage: 88.4,
                          discoUso: 0.0,
                          gpu: 2.36,
                        },
                        "2025-12-07_21-33-17": {
                          Time: "2025-12-07_21-33-17",
                          cpu: 7.5,
                          ram: 35.8,
                          storage: 88.4,
                          discoUso: 2.3,
                          gpu: 4.87,
                        },
                      },
                      {
                        "2025-12-07_21-34-26": {
                          Time: "2025-12-07_21-34-26",
                          cpu: 8.5,
                          ram: 35.7,
                          storage: 88.4,
                          discoUso: 0.1,
                          gpu: 6.99,
                        },
                        "2025-12-07_21-35-33": {
                          Time: "2025-12-07_21-35-33",
                          cpu: 5.3,
                          ram: 35.5,
                          storage: 88.4,
                          discoUso: 1.0,
                          gpu: 4.16,
                        },
                        "2025-12-07_21-36-39": {
                          Time: "2025-12-07_21-36-39",
                          cpu: 5.2,
                          ram: 35.6,
                          storage: 88.4,
                          discoUso: 1.1,
                          gpu: 2.47,
                        },
                        "2025-12-07_21-37-46": {
                          Time: "2025-12-07_21-37-46",
                          cpu: 4.6,
                          ram: 35.6,
                          storage: 88.4,
                          discoUso: 1.1,
                          gpu: 4.13,
                        },
                        "2025-12-07_21-38-52": {
                          Time: "2025-12-07_21-38-52",
                          cpu: 7.8,
                          ram: 35.6,
                          storage: 88.4,
                          discoUso: 1.2,
                          gpu: 4.07,
                        },
                      },
                      {
                        "2025-12-07_21-40-00": {
                          Time: "2025-12-07_21-40-00",
                          cpu: 4.8,
                          ram: 35.5,
                          storage: 88.4,
                          discoUso: 0.9,
                          gpu: 4.21,
                        },
                        "2025-12-07_21-41-07": {
                          Time: "2025-12-07_21-41-07",
                          cpu: 6.0,
                          ram: 35.6,
                          storage: 88.4,
                          discoUso: 1.2,
                          gpu: 4.22,
                        },
                        "2025-12-07_21-42-14": {
                          Time: "2025-12-07_21-42-14",
                          cpu: 4.9,
                          ram: 35.6,
                          storage: 88.4,
                          discoUso: 1.0,
                          gpu: 5.9,
                        },
                        "2025-12-07_21-43-20": {
                          Time: "2025-12-07_21-43-20",
                          cpu: 14.6,
                          ram: 36.1,
                          storage: 88.4,
                          discoUso: 8.3,
                          gpu: 4.32,
                        },
                        "2025-12-07_21-44-28": {
                          Time: "2025-12-07_21-44-28",
                          cpu: 16.8,
                          ram: 38.1,
                          storage: 88.4,
                          discoUso: 4.5,
                          gpu: 1.67,
                        },
                      },
                      {
                        "2025-12-07_21-45-36": {
                          Time: "2025-12-07_21-45-36",
                          cpu: 7.4,
                          ram: 38.4,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 0.77,
                        },
                        "2025-12-07_21-46-43": {
                          Time: "2025-12-07_21-46-43",
                          cpu: 7.6,
                          ram: 38.0,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 2.54,
                        },
                        "2025-12-07_21-47-49": {
                          Time: "2025-12-07_21-47-49",
                          cpu: 8.1,
                          ram: 38.1,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 1.55,
                        },
                        "2025-12-07_21-48-56": {
                          Time: "2025-12-07_21-48-56",
                          cpu: 6.7,
                          ram: 38.2,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 1.72,
                        },
                        "2025-12-07_21-50-03": {
                          Time: "2025-12-07_21-50-03",
                          cpu: 5.4,
                          ram: 37.9,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 1.75,
                        },
                      },
                      {
                        "2025-12-07_21-51-11": {
                          Time: "2025-12-07_21-51-11",
                          cpu: 5.2,
                          ram: 37.9,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 1.94,
                        },
                        "2025-12-07_21-52-18": {
                          Time: "2025-12-07_21-52-18",
                          cpu: 5.3,
                          ram: 38.1,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 1.84,
                        },
                        "2025-12-07_21-53-25": {
                          Time: "2025-12-07_21-53-25",
                          cpu: 6.5,
                          ram: 38.2,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 1.77,
                        },
                        "2025-12-07_21-54-32": {
                          Time: "2025-12-07_21-54-32",
                          cpu: 5.4,
                          ram: 38.2,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 1.76,
                        },
                        "2025-12-07_21-55-39": {
                          Time: "2025-12-07_21-55-39",
                          cpu: 8.3,
                          ram: 38.6,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 3.91,
                        },
                      },
                      {
                        "2025-12-07_21-56-48": {
                          Time: "2025-12-07_21-56-48",
                          cpu: 11.4,
                          ram: 38.5,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 3.99,
                        },
                        "2025-12-07_21-57-55": {
                          Time: "2025-12-07_21-57-55",
                          cpu: 9.9,
                          ram: 39.0,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 5.68,
                        },
                        "2025-12-07_21-59-03": {
                          Time: "2025-12-07_21-59-03",
                          cpu: 9.7,
                          ram: 38.4,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 1.69,
                        },
                        "2025-12-07_22-00-10": {
                          Time: "2025-12-07_22-00-10",
                          cpu: 14.6,
                          ram: 38.4,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 2.07,
                        },
                        "2025-12-07_22-01-17": {
                          Time: "2025-12-07_22-01-17",
                          cpu: 7.5,
                          ram: 38.4,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 4.28,
                        },
                      },
                      {
                        "2025-12-07_22-02-27": {
                          Time: "2025-12-07_22-02-27",
                          cpu: 16.8,
                          ram: 41.2,
                          storage: 88.5,
                          discoUso: 85.3,
                          gpu: 2.03,
                        },
                        "2025-12-07_22-03-35": {
                          Time: "2025-12-07_22-03-35",
                          cpu: 11.7,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 3.2,
                          gpu: 2.74,
                        },
                        "2025-12-07_22-04-43": {
                          Time: "2025-12-07_22-04-43",
                          cpu: 13.2,
                          ram: 40.9,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 2.59,
                        },
                        "2025-12-07_22-05-51": {
                          Time: "2025-12-07_22-05-51",
                          cpu: 9.8,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 1.56,
                        },
                        "2025-12-07_22-06-58": {
                          Time: "2025-12-07_22-06-58",
                          cpu: 6.4,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 1.72,
                        },
                      },
                      {
                        "2025-12-07_22-08-07": {
                          Time: "2025-12-07_22-08-07",
                          cpu: 6.1,
                          ram: 39.9,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 1.75,
                        },
                        "2025-12-07_22-09-15": {
                          Time: "2025-12-07_22-09-15",
                          cpu: 8.1,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 5.1,
                          gpu: 1.78,
                        },
                        "2025-12-07_22-10-23": {
                          Time: "2025-12-07_22-10-23",
                          cpu: 7.3,
                          ram: 40.0,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 1.56,
                        },
                        "2025-12-07_22-11-30": {
                          Time: "2025-12-07_22-11-30",
                          cpu: 6.3,
                          ram: 39.9,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 1.56,
                        },
                        "2025-12-07_22-12-38": {
                          Time: "2025-12-07_22-12-38",
                          cpu: 5.6,
                          ram: 39.6,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 0.84,
                        },
                      },
                      {
                        "2025-12-07_22-13-47": {
                          Time: "2025-12-07_22-13-47",
                          cpu: 6.3,
                          ram: 39.5,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 1.68,
                        },
                        "2025-12-07_22-14-55": {
                          Time: "2025-12-07_22-14-55",
                          cpu: 11.8,
                          ram: 39.8,
                          storage: 88.5,
                          discoUso: 0.9,
                          gpu: 5.85,
                        },
                        "2025-12-07_22-16-02": {
                          Time: "2025-12-07_22-16-02",
                          cpu: 9.4,
                          ram: 39.7,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 1.59,
                        },
                        "2025-12-07_22-17-10": {
                          Time: "2025-12-07_22-17-10",
                          cpu: 6.4,
                          ram: 39.7,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 1.86,
                        },
                        "2025-12-07_22-18-17": {
                          Time: "2025-12-07_22-18-17",
                          cpu: 7.4,
                          ram: 39.8,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 1.75,
                        },
                      },
                      {
                        "2025-12-07_22-19-26": {
                          Time: "2025-12-07_22-19-26",
                          cpu: 5.7,
                          ram: 39.5,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 1.75,
                        },
                        "2025-12-07_22-20-34": {
                          Time: "2025-12-07_22-20-34",
                          cpu: 6.3,
                          ram: 39.6,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 2.09,
                        },
                        "2025-12-07_22-21-41": {
                          Time: "2025-12-07_22-21-41",
                          cpu: 8.8,
                          ram: 39.5,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 4.81,
                        },
                        "2025-12-07_22-22-49": {
                          Time: "2025-12-07_22-22-49",
                          cpu: 9.7,
                          ram: 39.6,
                          storage: 88.5,
                          discoUso: 0.9,
                          gpu: 2.57,
                        },
                        "2025-12-07_22-23-56": {
                          Time: "2025-12-07_22-23-56",
                          cpu: 6.4,
                          ram: 39.6,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 2.74,
                        },
                      },
                      {
                        "2025-12-07_22-25-06": {
                          Time: "2025-12-07_22-25-06",
                          cpu: 9.8,
                          ram: 39.9,
                          storage: 88.5,
                          discoUso: 1.1,
                          gpu: 9.65,
                        },
                        "2025-12-07_22-26-14": {
                          Time: "2025-12-07_22-26-14",
                          cpu: 9.9,
                          ram: 40.0,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 1.63,
                        },
                        "2025-12-07_22-27-22": {
                          Time: "2025-12-07_22-27-22",
                          cpu: 9.9,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 2.91,
                        },
                        "2025-12-07_22-28-29": {
                          Time: "2025-12-07_22-28-29",
                          cpu: 5.2,
                          ram: 39.8,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 1.73,
                        },
                        "2025-12-07_22-29-37": {
                          Time: "2025-12-07_22-29-37",
                          cpu: 6.2,
                          ram: 39.7,
                          storage: 88.5,
                          discoUso: 1.3,
                          gpu: 0.87,
                        },
                      },
                      {
                        "2025-12-07_22-30-46": {
                          Time: "2025-12-07_22-30-46",
                          cpu: 5.6,
                          ram: 39.7,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 3.98,
                        },
                        "2025-12-07_22-31-53": {
                          Time: "2025-12-07_22-31-53",
                          cpu: 11.3,
                          ram: 39.7,
                          storage: 88.5,
                          discoUso: 0.9,
                          gpu: 2.91,
                        },
                        "2025-12-07_22-33-01": {
                          Time: "2025-12-07_22-33-01",
                          cpu: 10.2,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 0.9,
                          gpu: 2.96,
                        },
                        "2025-12-07_22-34-08": {
                          Time: "2025-12-07_22-34-08",
                          cpu: 8.9,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 6.37,
                        },
                        "2025-12-07_22-35-16": {
                          Time: "2025-12-07_22-35-16",
                          cpu: 10.7,
                          ram: 39.8,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 1.81,
                        },
                      },
                      {
                        "2025-12-07_22-36-25": {
                          Time: "2025-12-07_22-36-25",
                          cpu: 6.0,
                          ram: 39.8,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 1.82,
                        },
                        "2025-12-07_22-37-33": {
                          Time: "2025-12-07_22-37-33",
                          cpu: 6.7,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 1.5,
                          gpu: 2.08,
                        },
                        "2025-12-07_22-38-41": {
                          Time: "2025-12-07_22-38-41",
                          cpu: 6.1,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 1.57,
                        },
                        "2025-12-07_22-39-48": {
                          Time: "2025-12-07_22-39-48",
                          cpu: 6.4,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 4.7,
                          gpu: 1.65,
                        },
                        "2025-12-07_22-40-55": {
                          Time: "2025-12-07_22-40-55",
                          cpu: 5.8,
                          ram: 40.3,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 1.65,
                        },
                      },
                      {
                        "2025-12-07_22-42-05": {
                          Time: "2025-12-07_22-42-05",
                          cpu: 6.4,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 1.66,
                        },
                        "2025-12-07_22-43-12": {
                          Time: "2025-12-07_22-43-12",
                          cpu: 6.2,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 1.55,
                        },
                        "2025-12-07_22-44-20": {
                          Time: "2025-12-07_22-44-20",
                          cpu: 5.8,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 1.58,
                        },
                        "2025-12-07_22-45-27": {
                          Time: "2025-12-07_22-45-27",
                          cpu: 5.6,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 1.65,
                        },
                        "2025-12-07_22-46-35": {
                          Time: "2025-12-07_22-46-35",
                          cpu: 5.6,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 0.8,
                        },
                      },
                      {
                        "2025-12-07_22-47-44": {
                          Time: "2025-12-07_22-47-44",
                          cpu: 5.8,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 1.65,
                        },
                        "2025-12-07_22-48-52": {
                          Time: "2025-12-07_22-48-52",
                          cpu: 6.1,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 1.57,
                        },
                        "2025-12-07_22-49-59": {
                          Time: "2025-12-07_22-49-59",
                          cpu: 5.2,
                          ram: 40.3,
                          storage: 88.5,
                          discoUso: 0.0,
                          gpu: 1.59,
                        },
                        "2025-12-07_22-51-07": {
                          Time: "2025-12-07_22-51-07",
                          cpu: 6.2,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 1.55,
                        },
                        "2025-12-07_22-52-14": {
                          Time: "2025-12-07_22-52-14",
                          cpu: 5.4,
                          ram: 40.3,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 1.62,
                        },
                      },
                      {
                        "2025-12-07_22-53-23": {
                          Time: "2025-12-07_22-53-23",
                          cpu: 7.4,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 1.2,
                          gpu: 4.76,
                        },
                        "2025-12-07_22-54-31": {
                          Time: "2025-12-07_22-54-31",
                          cpu: 6.4,
                          ram: 40.0,
                          storage: 88.5,
                          discoUso: 9.0,
                          gpu: 4.58,
                        },
                        "2025-12-07_22-55-38": {
                          Time: "2025-12-07_22-55-38",
                          cpu: 5.7,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 1.1,
                          gpu: 1.61,
                        },
                        "2025-12-07_22-56-46": {
                          Time: "2025-12-07_22-56-46",
                          cpu: 6.4,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 4.5,
                        },
                        "2025-12-07_22-57-53": {
                          Time: "2025-12-07_22-57-53",
                          cpu: 6.8,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 4.76,
                        },
                      },
                      {
                        "2025-12-07_22-59-02": {
                          Time: "2025-12-07_22-59-02",
                          cpu: 6.6,
                          ram: 40.3,
                          storage: 88.5,
                          discoUso: 1.2,
                          gpu: 4.62,
                        },
                        "2025-12-07_23-00-10": {
                          Time: "2025-12-07_23-00-10",
                          cpu: 6.2,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 4.9,
                        },
                        "2025-12-07_23-01-18": {
                          Time: "2025-12-07_23-01-18",
                          cpu: 6.1,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 4.66,
                        },
                        "2025-12-07_23-02-25": {
                          Time: "2025-12-07_23-02-25",
                          cpu: 6.1,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 1.0,
                          gpu: 6.43,
                        },
                        "2025-12-07_23-03-33": {
                          Time: "2025-12-07_23-03-33",
                          cpu: 6.4,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 1.1,
                          gpu: 4.66,
                        },
                      },
                      {
                        "2025-12-07_23-04-42": {
                          Time: "2025-12-07_23-04-42",
                          cpu: 5.8,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 4.69,
                        },
                        "2025-12-07_23-05-50": {
                          Time: "2025-12-07_23-05-50",
                          cpu: 5.9,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 4.59,
                        },
                        "2025-12-07_23-06-57": {
                          Time: "2025-12-07_23-06-57",
                          cpu: 6.3,
                          ram: 40.1,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 4.79,
                        },
                        "2025-12-07_23-08-05": {
                          Time: "2025-12-07_23-08-05",
                          cpu: 6.9,
                          ram: 40.3,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 4.67,
                        },
                        "2025-12-07_23-09-13": {
                          Time: "2025-12-07_23-09-13",
                          cpu: 6.9,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 0.9,
                          gpu: 4.61,
                        },
                      },
                      {
                        "2025-12-07_23-10-22": {
                          Time: "2025-12-07_23-10-22",
                          cpu: 6.2,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 1.0,
                          gpu: 4.51,
                        },
                        "2025-12-07_23-11-30": {
                          Time: "2025-12-07_23-11-30",
                          cpu: 5.8,
                          ram: 40.3,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 4.61,
                        },
                        "2025-12-07_23-12-37": {
                          Time: "2025-12-07_23-12-37",
                          cpu: 6.5,
                          ram: 40.3,
                          storage: 88.5,
                          discoUso: 1.1,
                          gpu: 1.57,
                        },
                        "2025-12-07_23-13-45": {
                          Time: "2025-12-07_23-13-45",
                          cpu: 9.1,
                          ram: 40.8,
                          storage: 88.5,
                          discoUso: 1.7,
                          gpu: 4.71,
                        },
                        "2025-12-07_23-14-53": {
                          Time: "2025-12-07_23-14-53",
                          cpu: 6.9,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 4.55,
                        },
                      },
                      {
                        "2025-12-07_23-16-02": {
                          Time: "2025-12-07_23-16-02",
                          cpu: 6.5,
                          ram: 40.5,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 4.58,
                        },
                        "2025-12-07_23-17-10": {
                          Time: "2025-12-07_23-17-10",
                          cpu: 6.6,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 1.1,
                          gpu: 4.65,
                        },
                        "2025-12-07_23-18-17": {
                          Time: "2025-12-07_23-18-17",
                          cpu: 8.1,
                          ram: 40.8,
                          storage: 88.5,
                          discoUso: 1.0,
                          gpu: 4.96,
                        },
                        "2025-12-07_23-19-25": {
                          Time: "2025-12-07_23-19-25",
                          cpu: 6.4,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 4.73,
                        },
                        "2025-12-07_23-20-33": {
                          Time: "2025-12-07_23-20-33",
                          cpu: 6.9,
                          ram: 40.8,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 4.72,
                        },
                      },
                      {
                        "2025-12-07_23-21-42": {
                          Time: "2025-12-07_23-21-42",
                          cpu: 6.3,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 1.1,
                          gpu: 4.56,
                        },
                        "2025-12-07_23-22-49": {
                          Time: "2025-12-07_23-22-49",
                          cpu: 6.9,
                          ram: 40.5,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 4.78,
                        },
                        "2025-12-07_23-23-57": {
                          Time: "2025-12-07_23-23-57",
                          cpu: 6.6,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 1.3,
                          gpu: 4.76,
                        },
                        "2025-12-07_23-25-05": {
                          Time: "2025-12-07_23-25-05",
                          cpu: 6.3,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 1.2,
                          gpu: 4.58,
                        },
                        "2025-12-07_23-26-12": {
                          Time: "2025-12-07_23-26-12",
                          cpu: 6.5,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 1.2,
                          gpu: 4.81,
                        },
                      },
                      {
                        "2025-12-07_23-27-21": {
                          Time: "2025-12-07_23-27-21",
                          cpu: 7.2,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 4.76,
                        },
                        "2025-12-07_23-28-29": {
                          Time: "2025-12-07_23-28-29",
                          cpu: 6.3,
                          ram: 40.7,
                          storage: 88.5,
                          discoUso: 0.9,
                          gpu: 4.7,
                        },
                        "2025-12-07_23-29-36": {
                          Time: "2025-12-07_23-29-36",
                          cpu: 6.1,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 1.97,
                        },
                        "2025-12-07_23-30-44": {
                          Time: "2025-12-07_23-30-44",
                          cpu: 6.9,
                          ram: 40.6,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 4.7,
                        },
                        "2025-12-07_23-31-51": {
                          Time: "2025-12-07_23-31-51",
                          cpu: 6.1,
                          ram: 40.2,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 4.57,
                        },
                      },
                      {
                        "2025-12-07_23-33-00": {
                          Time: "2025-12-07_23-33-00",
                          cpu: 8.3,
                          ram: 40.5,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 3.92,
                        },
                        "2025-12-07_23-34-08": {
                          Time: "2025-12-07_23-34-08",
                          cpu: 11.5,
                          ram: 40.7,
                          storage: 88.5,
                          discoUso: 1.2,
                          gpu: 11.62,
                        },
                        "2025-12-07_23-35-16": {
                          Time: "2025-12-07_23-35-16",
                          cpu: 8.0,
                          ram: 40.4,
                          storage: 88.5,
                          discoUso: 1.0,
                          gpu: 2.81,
                        },
                      },
                      {
                        "2025-12-07_23-40-36": {
                          Time: "2025-12-07_23-40-36",
                          cpu: 17.4,
                          ram: 42.3,
                          storage: 88.5,
                          discoUso: 3.2,
                          gpu: 3.34,
                        },
                        "2025-12-07_23-41-44": {
                          Time: "2025-12-07_23-41-44",
                          cpu: 12.4,
                          ram: 42.5,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 1.83,
                        },
                        "2025-12-07_23-42-52": {
                          Time: "2025-12-07_23-42-52",
                          cpu: 10.7,
                          ram: 42.4,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 6.68,
                        },
                        "2025-12-07_23-44-01": {
                          Time: "2025-12-07_23-44-01",
                          cpu: 14.2,
                          ram: 42.6,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 11.36,
                        },
                        "2025-12-07_23-45-10": {
                          Time: "2025-12-07_23-45-10",
                          cpu: 14.7,
                          ram: 42.7,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 6.43,
                        },
                        "2025-12-07_23-46-18": {
                          Time: "2025-12-07_23-46-18",
                          cpu: 12.5,
                          ram: 42.6,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 6.75,
                        },
                      },
                      {
                        "2025-12-07_23-47-31": {
                          Time: "2025-12-07_23-47-31",
                          cpu: 10.6,
                          ram: 42.8,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 7.66,
                        },
                        "2025-12-07_23-48-39": {
                          Time: "2025-12-07_23-48-39",
                          cpu: 15.9,
                          ram: 43.0,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 7.88,
                        },
                        "2025-12-07_23-49-48": {
                          Time: "2025-12-07_23-49-48",
                          cpu: 14.6,
                          ram: 43.1,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 8.19,
                        },
                        "2025-12-07_23-50-56": {
                          Time: "2025-12-07_23-50-56",
                          cpu: 17.7,
                          ram: 43.0,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 7.64,
                        },
                        "2025-12-07_23-52-04": {
                          Time: "2025-12-07_23-52-04",
                          cpu: 11.6,
                          ram: 43.1,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 5.45,
                        },
                      },
                      {
                        "2025-12-07_23-53-14": {
                          Time: "2025-12-07_23-53-14",
                          cpu: 19.7,
                          ram: 42.9,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 7.21,
                        },
                        "2025-12-07_23-54-22": {
                          Time: "2025-12-07_23-54-22",
                          cpu: 11.7,
                          ram: 42.4,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 1.77,
                        },
                        "2025-12-07_23-55-30": {
                          Time: "2025-12-07_23-55-30",
                          cpu: 5.5,
                          ram: 42.3,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 5.7,
                        },
                        "2025-12-07_23-56-38": {
                          Time: "2025-12-07_23-56-38",
                          cpu: 5.6,
                          ram: 42.4,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 0.85,
                        },
                        "2025-12-07_23-57-45": {
                          Time: "2025-12-07_23-57-45",
                          cpu: 6.3,
                          ram: 42.4,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 3.9,
                        },
                      },
                      {
                        "2025-12-07_23-58-55": {
                          Time: "2025-12-07_23-58-55",
                          cpu: 9.2,
                          ram: 42.6,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 2.04,
                        },
                        "2025-12-08_00-00-02": {
                          Time: "2025-12-08_00-00-02",
                          cpu: 6.0,
                          ram: 42.8,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 1.77,
                        },
                        "2025-12-08_00-01-09": {
                          Time: "2025-12-08_00-01-09",
                          cpu: 9.3,
                          ram: 43.0,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 7.31,
                        },
                        "2025-12-08_00-02-17": {
                          Time: "2025-12-08_00-02-17",
                          cpu: 10.2,
                          ram: 42.9,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 1.66,
                        },
                        "2025-12-08_00-03-25": {
                          Time: "2025-12-08_00-03-25",
                          cpu: 12.8,
                          ram: 43.3,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 8.75,
                        },
                      },
                      {
                        "2025-12-08_00-04-36": {
                          Time: "2025-12-08_00-04-36",
                          cpu: 16.1,
                          ram: 43.5,
                          storage: 88.5,
                          discoUso: 1.4,
                          gpu: 0.87,
                        },
                        "2025-12-08_00-05-44": {
                          Time: "2025-12-08_00-05-44",
                          cpu: 16.2,
                          ram: 43.6,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 2.3,
                        },
                        "2025-12-08_00-06-53": {
                          Time: "2025-12-08_00-06-53",
                          cpu: 13.7,
                          ram: 43.8,
                          storage: 88.5,
                          discoUso: 1.1,
                          gpu: 8.62,
                        },
                        "2025-12-08_00-08-02": {
                          Time: "2025-12-08_00-08-02",
                          cpu: 15.6,
                          ram: 44.0,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 6.3,
                        },
                        "2025-12-08_00-09-11": {
                          Time: "2025-12-08_00-09-11",
                          cpu: 12.8,
                          ram: 44.1,
                          storage: 88.5,
                          discoUso: 0.9,
                          gpu: 5.65,
                        },
                      },
                      {
                        "2025-12-08_00-10-22": {
                          Time: "2025-12-08_00-10-22",
                          cpu: 10.5,
                          ram: 44.4,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 5.68,
                        },
                        "2025-12-08_00-11-30": {
                          Time: "2025-12-08_00-11-30",
                          cpu: 11.7,
                          ram: 44.4,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 10.23,
                        },
                        "2025-12-08_00-12-39": {
                          Time: "2025-12-08_00-12-39",
                          cpu: 16.7,
                          ram: 44.0,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 5.32,
                        },
                        "2025-12-08_00-13-48": {
                          Time: "2025-12-08_00-13-48",
                          cpu: 12.2,
                          ram: 44.1,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 5.5,
                        },
                        "2025-12-08_00-14-56": {
                          Time: "2025-12-08_00-14-56",
                          cpu: 8.8,
                          ram: 43.9,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 2.93,
                        },
                      },
                      {
                        "2025-12-08_00-16-06": {
                          Time: "2025-12-08_00-16-06",
                          cpu: 9.4,
                          ram: 44.0,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 1.71,
                        },
                        "2025-12-08_00-17-13": {
                          Time: "2025-12-08_00-17-13",
                          cpu: 8.2,
                          ram: 44.0,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 4.04,
                        },
                        "2025-12-08_00-18-21": {
                          Time: "2025-12-08_00-18-21",
                          cpu: 9.6,
                          ram: 43.8,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 6.14,
                        },
                        "2025-12-08_00-19-29": {
                          Time: "2025-12-08_00-19-29",
                          cpu: 11.8,
                          ram: 43.9,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 6.91,
                        },
                        "2025-12-08_00-20-38": {
                          Time: "2025-12-08_00-20-38",
                          cpu: 12.6,
                          ram: 44.0,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 2.97,
                        },
                      },
                      {
                        "2025-12-08_00-21-49": {
                          Time: "2025-12-08_00-21-49",
                          cpu: 13.6,
                          ram: 44.0,
                          storage: 88.5,
                          discoUso: 1.3,
                          gpu: 5.74,
                        },
                        "2025-12-08_00-23-00": {
                          Time: "2025-12-08_00-23-00",
                          cpu: 16.1,
                          ram: 44.3,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 4.54,
                        },
                        "2025-12-08_00-24-08": {
                          Time: "2025-12-08_00-24-08",
                          cpu: 15.1,
                          ram: 44.1,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 8.09,
                        },
                        "2025-12-08_00-25-18": {
                          Time: "2025-12-08_00-25-18",
                          cpu: 14.4,
                          ram: 44.3,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 2.93,
                        },
                        "2025-12-08_00-26-26": {
                          Time: "2025-12-08_00-26-26",
                          cpu: 10.9,
                          ram: 43.4,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 2.69,
                        },
                      },
                      {
                        "2025-12-08_00-27-36": {
                          Time: "2025-12-08_00-27-36",
                          cpu: 12.4,
                          ram: 44.0,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 2.96,
                        },
                        "2025-12-08_00-28-45": {
                          Time: "2025-12-08_00-28-45",
                          cpu: 18.8,
                          ram: 44.7,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 5.76,
                        },
                        "2025-12-08_00-29-54": {
                          Time: "2025-12-08_00-29-54",
                          cpu: 15.6,
                          ram: 44.5,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 4.76,
                        },
                        "2025-12-08_00-31-02": {
                          Time: "2025-12-08_00-31-02",
                          cpu: 12.8,
                          ram: 44.5,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 6.45,
                        },
                        "2025-12-08_00-32-11": {
                          Time: "2025-12-08_00-32-11",
                          cpu: 12.9,
                          ram: 44.4,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 4.54,
                        },
                      },
                      {
                        "2025-12-08_00-33-21": {
                          Time: "2025-12-08_00-33-21",
                          cpu: 9.4,
                          ram: 44.4,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 1.8,
                        },
                        "2025-12-08_00-34-28": {
                          Time: "2025-12-08_00-34-28",
                          cpu: 12.5,
                          ram: 44.4,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 6.08,
                        },
                        "2025-12-08_00-35-37": {
                          Time: "2025-12-08_00-35-37",
                          cpu: 20.1,
                          ram: 44.7,
                          storage: 88.5,
                          discoUso: 0.2,
                          gpu: 2.39,
                        },
                        "2025-12-08_00-36-46": {
                          Time: "2025-12-08_00-36-46",
                          cpu: 17.5,
                          ram: 44.5,
                          storage: 88.5,
                          discoUso: 2.7,
                          gpu: 4.66,
                        },
                        "2025-12-08_00-37-56": {
                          Time: "2025-12-08_00-37-56",
                          cpu: 26.4,
                          ram: 50.2,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 99.03,
                        },
                      },
                      {
                        "2025-12-08_00-39-10": {
                          Time: "2025-12-08_00-39-10",
                          cpu: 36.5,
                          ram: 51.0,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 99.51,
                        },
                        "2025-12-08_00-40-26": {
                          Time: "2025-12-08_00-40-26",
                          cpu: 45.6,
                          ram: 51.6,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 99.63,
                        },
                        "2025-12-08_00-41-38": {
                          Time: "2025-12-08_00-41-38",
                          cpu: 32.7,
                          ram: 51.7,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 99.25,
                        },
                        "2025-12-08_00-42-51": {
                          Time: "2025-12-08_00-42-51",
                          cpu: 32.5,
                          ram: 43.0,
                          storage: 88.5,
                          discoUso: 0.9,
                          gpu: 98.34,
                        },
                        "2025-12-08_00-44-04": {
                          Time: "2025-12-08_00-44-04",
                          cpu: 38.8,
                          ram: 42.9,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 99.59,
                        },
                      },
                      {
                        "2025-12-08_00-45-17": {
                          Time: "2025-12-08_00-45-17",
                          cpu: 29.9,
                          ram: 42.8,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 99.82,
                        },
                        "2025-12-08_00-46-28": {
                          Time: "2025-12-08_00-46-28",
                          cpu: 26.2,
                          ram: 42.7,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 99.7,
                        },
                        "2025-12-08_00-47-39": {
                          Time: "2025-12-08_00-47-39",
                          cpu: 28.7,
                          ram: 42.8,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 99.24,
                        },
                        "2025-12-08_00-48-52": {
                          Time: "2025-12-08_00-48-52",
                          cpu: 42.0,
                          ram: 43.0,
                          storage: 88.5,
                          discoUso: 6.6,
                          gpu: 99.67,
                        },
                        "2025-12-08_00-50-03": {
                          Time: "2025-12-08_00-50-03",
                          cpu: 34.5,
                          ram: 42.7,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 99.8,
                        },
                      },
                      {
                        "2025-12-08_00-51-15": {
                          Time: "2025-12-08_00-51-15",
                          cpu: 37.5,
                          ram: 42.7,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 99.79,
                        },
                        "2025-12-08_00-52-27": {
                          Time: "2025-12-08_00-52-27",
                          cpu: 39.4,
                          ram: 42.2,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 99.63,
                        },
                        "2025-12-08_00-53-39": {
                          Time: "2025-12-08_00-53-39",
                          cpu: 48.8,
                          ram: 42.5,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 99.62,
                        },
                        "2025-12-08_00-54-51": {
                          Time: "2025-12-08_00-54-51",
                          cpu: 45.8,
                          ram: 42.3,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 99.54,
                        },
                        "2025-12-08_00-56-05": {
                          Time: "2025-12-08_00-56-05",
                          cpu: 46.9,
                          ram: 42.4,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 99.82,
                        },
                      },
                      {
                        "2025-12-08_00-57-18": {
                          Time: "2025-12-08_00-57-18",
                          cpu: 43.8,
                          ram: 42.4,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 99.63,
                        },
                        "2025-12-08_00-58-31": {
                          Time: "2025-12-08_00-58-31",
                          cpu: 49.6,
                          ram: 42.7,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 99.32,
                        },
                        "2025-12-08_00-59-44": {
                          Time: "2025-12-08_00-59-44",
                          cpu: 43.4,
                          ram: 42.8,
                          storage: 88.5,
                          discoUso: 1.0,
                          gpu: 99.85,
                        },
                        "2025-12-08_01-00-55": {
                          Time: "2025-12-08_01-00-55",
                          cpu: 31.8,
                          ram: 42.3,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 99.81,
                        },
                        "2025-12-08_01-02-06": {
                          Time: "2025-12-08_01-02-06",
                          cpu: 28.3,
                          ram: 42.4,
                          storage: 88.5,
                          discoUso: 1.7,
                          gpu: 99.96,
                        },
                      },
                      {
                        "2025-12-08_01-03-18": {
                          Time: "2025-12-08_01-03-18",
                          cpu: 30.1,
                          ram: 42.7,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 99.96,
                        },
                        "2025-12-08_01-04-29": {
                          Time: "2025-12-08_01-04-29",
                          cpu: 29.0,
                          ram: 42.5,
                          storage: 88.5,
                          discoUso: 0.8,
                          gpu: 98.9,
                        },
                        "2025-12-08_01-05-40": {
                          Time: "2025-12-08_01-05-40",
                          cpu: 16.8,
                          ram: 36.4,
                          storage: 88.5,
                          discoUso: 1.2,
                          gpu: 2.12,
                        },
                        "2025-12-08_01-06-49": {
                          Time: "2025-12-08_01-06-49",
                          cpu: 17.5,
                          ram: 36.8,
                          storage: 88.5,
                          discoUso: 1.3,
                          gpu: 10.38,
                        },
                        "2025-12-08_01-07-59": {
                          Time: "2025-12-08_01-07-59",
                          cpu: 16.2,
                          ram: 36.9,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 7.24,
                        },
                      },
                      {
                        "2025-12-08_01-09-11": {
                          Time: "2025-12-08_01-09-11",
                          cpu: 23.7,
                          ram: 37.4,
                          storage: 88.5,
                          discoUso: 1.3,
                          gpu: 5.63,
                        },
                        "2025-12-08_01-10-21": {
                          Time: "2025-12-08_01-10-21",
                          cpu: 24.1,
                          ram: 37.2,
                          storage: 88.5,
                          discoUso: 0.4,
                          gpu: 5.15,
                        },
                        "2025-12-08_01-11-31": {
                          Time: "2025-12-08_01-11-31",
                          cpu: 23.5,
                          ram: 37.3,
                          storage: 88.5,
                          discoUso: 1.1,
                          gpu: 5.11,
                        },
                        "2025-12-08_01-12-41": {
                          Time: "2025-12-08_01-12-41",
                          cpu: 21.4,
                          ram: 38.0,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 4.56,
                        },
                        "2025-12-08_01-13-50": {
                          Time: "2025-12-08_01-13-50",
                          cpu: 19.5,
                          ram: 38.8,
                          storage: 88.5,
                          discoUso: 0.7,
                          gpu: 4.46,
                        },
                      },
                      {
                        "2025-12-08_01-15-02": {
                          Time: "2025-12-08_01-15-02",
                          cpu: 20.5,
                          ram: 39.1,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 5.51,
                        },
                        "2025-12-08_01-16-13": {
                          Time: "2025-12-08_01-16-13",
                          cpu: 24.3,
                          ram: 39.1,
                          storage: 88.5,
                          discoUso: 0.5,
                          gpu: 4.97,
                        },
                        "2025-12-08_01-17-23": {
                          Time: "2025-12-08_01-17-23",
                          cpu: 22.0,
                          ram: 39.2,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 6.04,
                        },
                        "2025-12-08_01-18-33": {
                          Time: "2025-12-08_01-18-33",
                          cpu: 20.0,
                          ram: 37.6,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 0.08,
                        },
                        "2025-12-08_01-19-41": {
                          Time: "2025-12-08_01-19-41",
                          cpu: 6.1,
                          ram: 37.2,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 0.17,
                        },
                      },
                      {
                        "2025-12-08_01-20-52": {
                          Time: "2025-12-08_01-20-52",
                          cpu: 6.7,
                          ram: 37.2,
                          storage: 88.5,
                          discoUso: 0.1,
                          gpu: 0.65,
                        },
                        "2025-12-08_01-21-59": {
                          Time: "2025-12-08_01-21-59",
                          cpu: 5.5,
                          ram: 37.1,
                          storage: 88.5,
                          discoUso: 0.0,
                          gpu: 0.19,
                        },
                        "2025-12-08_01-23-08": {
                          Time: "2025-12-08_01-23-08",
                          cpu: 10.0,
                          ram: 37.4,
                          storage: 88.5,
                          discoUso: 0.3,
                          gpu: 0.2,
                        },
                        "2025-12-08_01-24-17": {
                          Time: "2025-12-08_01-24-17",
                          cpu: 12.4,
                          ram: 38.1,
                          storage: 88.5,
                          discoUso: 0.6,
                          gpu: 11.35,
                        },
                        "2025-12-08_01-25-26": {
                          Time: "2025-12-08_01-25-26",
                          cpu: 18.9,
                          ram: 38.4,
                          storage: 88.6,
                          discoUso: 1.6,
                          gpu: 1.8,
                        },
                      },
                      {
                        "2025-12-08_01-26-37": {
                          Time: "2025-12-08_01-26-37",
                          cpu: 13.8,
                          ram: 38.8,
                          storage: 88.6,
                          discoUso: 1.8,
                          gpu: 1.18,
                        },
                        "2025-12-08_01-27-46": {
                          Time: "2025-12-08_01-27-46",
                          cpu: 18.8,
                          ram: 38.7,
                          storage: 88.7,
                          discoUso: 3.9,
                          gpu: 2.98,
                        },
                        "2025-12-08_01-28-54": {
                          Time: "2025-12-08_01-28-54",
                          cpu: 13.7,
                          ram: 38.7,
                          storage: 88.7,
                          discoUso: 1.0,
                          gpu: 1.87,
                        },
                        "2025-12-08_01-30-03": {
                          Time: "2025-12-08_01-30-03",
                          cpu: 13.9,
                          ram: 38.8,
                          storage: 88.7,
                          discoUso: 0.8,
                          gpu: 7.26,
                        },
                        "2025-12-08_01-31-13": {
                          Time: "2025-12-08_01-31-13",
                          cpu: 16.5,
                          ram: 39.3,
                          storage: 88.7,
                          discoUso: 9.7,
                          gpu: 3.66,
                        },
                      },
                      {
                        "2025-12-08_01-32-25": {
                          Time: "2025-12-08_01-32-25",
                          cpu: 14.0,
                          ram: 39.2,
                          storage: 88.7,
                          discoUso: 0.5,
                          gpu: 1.63,
                        },
                        "2025-12-08_01-33-33": {
                          Time: "2025-12-08_01-33-33",
                          cpu: 11.8,
                          ram: 39.3,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 4.24,
                        },
                        "2025-12-08_01-34-42": {
                          Time: "2025-12-08_01-34-42",
                          cpu: 10.5,
                          ram: 39.2,
                          storage: 88.7,
                          discoUso: 0.6,
                          gpu: 1.87,
                        },
                        "2025-12-08_01-35-50": {
                          Time: "2025-12-08_01-35-50",
                          cpu: 13.1,
                          ram: 39.6,
                          storage: 88.7,
                          discoUso: 1.9,
                          gpu: 2.94,
                        },
                        "2025-12-08_01-36-59": {
                          Time: "2025-12-08_01-36-59",
                          cpu: 12.8,
                          ram: 39.6,
                          storage: 88.7,
                          discoUso: 0.7,
                          gpu: 12.19,
                        },
                      },
                      {
                        "2025-12-08_01-38-10": {
                          Time: "2025-12-08_01-38-10",
                          cpu: 12.8,
                          ram: 40.0,
                          storage: 88.7,
                          discoUso: 1.3,
                          gpu: 1.82,
                        },
                        "2025-12-08_01-39-18": {
                          Time: "2025-12-08_01-39-18",
                          cpu: 14.0,
                          ram: 39.9,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 6.41,
                        },
                        "2025-12-08_01-40-27": {
                          Time: "2025-12-08_01-40-27",
                          cpu: 12.6,
                          ram: 40.2,
                          storage: 88.8,
                          discoUso: 4.9,
                          gpu: 3.51,
                        },
                        "2025-12-08_01-41-35": {
                          Time: "2025-12-08_01-41-35",
                          cpu: 12.3,
                          ram: 40.2,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 1.2,
                        },
                        "2025-12-08_01-42-44": {
                          Time: "2025-12-08_01-42-44",
                          cpu: 12.4,
                          ram: 40.1,
                          storage: 88.8,
                          discoUso: 0.2,
                          gpu: 1.88,
                        },
                      },
                      {
                        "2025-12-08_01-43-54": {
                          Time: "2025-12-08_01-43-54",
                          cpu: 11.1,
                          ram: 40.1,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 6.12,
                        },
                        "2025-12-08_01-45-02": {
                          Time: "2025-12-08_01-45-02",
                          cpu: 14.3,
                          ram: 40.0,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 1.89,
                        },
                        "2025-12-08_01-46-10": {
                          Time: "2025-12-08_01-46-10",
                          cpu: 8.3,
                          ram: 40.0,
                          storage: 88.8,
                          discoUso: 1.0,
                          gpu: 6.87,
                        },
                        "2025-12-08_01-47-19": {
                          Time: "2025-12-08_01-47-19",
                          cpu: 13.2,
                          ram: 40.1,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 11.52,
                        },
                        "2025-12-08_01-48-28": {
                          Time: "2025-12-08_01-48-28",
                          cpu: 16.6,
                          ram: 40.3,
                          storage: 88.8,
                          discoUso: 0.8,
                          gpu: 2.64,
                        },
                      },
                      {
                        "2025-12-08_01-49-38": {
                          Time: "2025-12-08_01-49-38",
                          cpu: 10.3,
                          ram: 40.1,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 0.98,
                        },
                        "2025-12-08_01-50-46": {
                          Time: "2025-12-08_01-50-46",
                          cpu: 10.3,
                          ram: 40.3,
                          storage: 88.8,
                          discoUso: 0.8,
                          gpu: 6.43,
                        },
                        "2025-12-08_01-51-55": {
                          Time: "2025-12-08_01-51-55",
                          cpu: 19.1,
                          ram: 40.6,
                          storage: 88.8,
                          discoUso: 1.8,
                          gpu: 5.24,
                        },
                        "2025-12-08_01-53-04": {
                          Time: "2025-12-08_01-53-04",
                          cpu: 14.7,
                          ram: 41.2,
                          storage: 88.8,
                          discoUso: 3.0,
                          gpu: 14.26,
                        },
                        "2025-12-08_01-54-14": {
                          Time: "2025-12-08_01-54-14",
                          cpu: 20.1,
                          ram: 41.8,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 3.05,
                        },
                      },
                      {
                        "2025-12-08_01-55-25": {
                          Time: "2025-12-08_01-55-25",
                          cpu: 18.7,
                          ram: 42.1,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 9.77,
                        },
                        "2025-12-08_01-56-34": {
                          Time: "2025-12-08_01-56-34",
                          cpu: 17.3,
                          ram: 41.4,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 1.52,
                        },
                        "2025-12-08_01-57-42": {
                          Time: "2025-12-08_01-57-42",
                          cpu: 12.4,
                          ram: 42.1,
                          storage: 88.8,
                          discoUso: 1.0,
                          gpu: 2.04,
                        },
                        "2025-12-08_01-58-51": {
                          Time: "2025-12-08_01-58-51",
                          cpu: 12.5,
                          ram: 42.3,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 4.62,
                        },
                        "2025-12-08_01-59-59": {
                          Time: "2025-12-08_01-59-59",
                          cpu: 10.4,
                          ram: 41.7,
                          storage: 88.8,
                          discoUso: 1.1,
                          gpu: 4.47,
                        },
                      },
                      {
                        "2025-12-08_02-01-10": {
                          Time: "2025-12-08_02-01-10",
                          cpu: 12.2,
                          ram: 41.6,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 5.88,
                        },
                        "2025-12-08_02-02-19": {
                          Time: "2025-12-08_02-02-19",
                          cpu: 18.6,
                          ram: 42.0,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 11.38,
                        },
                        "2025-12-08_02-03-28": {
                          Time: "2025-12-08_02-03-28",
                          cpu: 19.1,
                          ram: 42.4,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 1.84,
                        },
                        "2025-12-08_02-04-36": {
                          Time: "2025-12-08_02-04-36",
                          cpu: 8.4,
                          ram: 41.6,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 0.95,
                        },
                        "2025-12-08_02-05-43": {
                          Time: "2025-12-08_02-05-43",
                          cpu: 8.2,
                          ram: 41.5,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 1.93,
                        },
                      },
                      {
                        "2025-12-08_02-06-53": {
                          Time: "2025-12-08_02-06-53",
                          cpu: 15.1,
                          ram: 41.4,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 3.55,
                        },
                        "2025-12-08_02-08-02": {
                          Time: "2025-12-08_02-08-02",
                          cpu: 12.1,
                          ram: 41.5,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 1.95,
                        },
                        "2025-12-08_02-09-11": {
                          Time: "2025-12-08_02-09-11",
                          cpu: 22.5,
                          ram: 42.7,
                          storage: 88.8,
                          discoUso: 1.1,
                          gpu: 6.57,
                        },
                        "2025-12-08_02-10-20": {
                          Time: "2025-12-08_02-10-20",
                          cpu: 14.5,
                          ram: 42.2,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 4.68,
                        },
                        "2025-12-08_02-11-29": {
                          Time: "2025-12-08_02-11-29",
                          cpu: 12.5,
                          ram: 41.7,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 6.1,
                        },
                      },
                      {
                        "2025-12-08_02-12-40": {
                          Time: "2025-12-08_02-12-40",
                          cpu: 15.5,
                          ram: 41.8,
                          storage: 88.8,
                          discoUso: 0.4,
                          gpu: 5.58,
                        },
                        "2025-12-08_02-13-49": {
                          Time: "2025-12-08_02-13-49",
                          cpu: 16.9,
                          ram: 41.9,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 3.36,
                        },
                        "2025-12-08_02-14-58": {
                          Time: "2025-12-08_02-14-58",
                          cpu: 12.9,
                          ram: 41.9,
                          storage: 88.8,
                          discoUso: 0.8,
                          gpu: 4.78,
                        },
                        "2025-12-08_02-16-07": {
                          Time: "2025-12-08_02-16-07",
                          cpu: 12.8,
                          ram: 41.8,
                          storage: 88.8,
                          discoUso: 0.4,
                          gpu: 4.1,
                        },
                        "2025-12-08_02-17-15": {
                          Time: "2025-12-08_02-17-15",
                          cpu: 12.9,
                          ram: 41.8,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 4.28,
                        },
                      },
                      {
                        "2025-12-08_02-18-26": {
                          Time: "2025-12-08_02-18-26",
                          cpu: 14.6,
                          ram: 42.0,
                          storage: 88.8,
                          discoUso: 0.4,
                          gpu: 2.11,
                        },
                        "2025-12-08_02-19-34": {
                          Time: "2025-12-08_02-19-34",
                          cpu: 7.3,
                          ram: 42.0,
                          storage: 88.8,
                          discoUso: 0.4,
                          gpu: 1.33,
                        },
                        "2025-12-08_02-20-42": {
                          Time: "2025-12-08_02-20-42",
                          cpu: 8.1,
                          ram: 41.8,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 2.14,
                        },
                        "2025-12-08_02-21-50": {
                          Time: "2025-12-08_02-21-50",
                          cpu: 7.7,
                          ram: 41.7,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 2.13,
                        },
                        "2025-12-08_02-22-58": {
                          Time: "2025-12-08_02-22-58",
                          cpu: 8.4,
                          ram: 41.9,
                          storage: 88.8,
                          discoUso: 0.4,
                          gpu: 4.58,
                        },
                      },
                      {
                        "2025-12-08_02-24-09": {
                          Time: "2025-12-08_02-24-09",
                          cpu: 14.4,
                          ram: 41.2,
                          storage: 88.8,
                          discoUso: 1.4,
                          gpu: 5.83,
                        },
                        "2025-12-08_02-25-17": {
                          Time: "2025-12-08_02-25-17",
                          cpu: 9.4,
                          ram: 41.1,
                          storage: 88.8,
                          discoUso: 2.9,
                          gpu: 2.07,
                        },
                        "2025-12-08_02-26-25": {
                          Time: "2025-12-08_02-26-25",
                          cpu: 9.4,
                          ram: 41.1,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 6.93,
                        },
                        "2025-12-08_02-27-34": {
                          Time: "2025-12-08_02-27-34",
                          cpu: 17.5,
                          ram: 41.3,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 1.53,
                        },
                        "2025-12-08_02-28-43": {
                          Time: "2025-12-08_02-28-43",
                          cpu: 18.1,
                          ram: 41.7,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 3.37,
                        },
                      },
                      {
                        "2025-12-08_02-29-53": {
                          Time: "2025-12-08_02-29-53",
                          cpu: 12.0,
                          ram: 41.3,
                          storage: 88.8,
                          discoUso: 0.4,
                          gpu: 6.8,
                        },
                        "2025-12-08_02-31-02": {
                          Time: "2025-12-08_02-31-02",
                          cpu: 12.9,
                          ram: 41.3,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 3.46,
                        },
                        "2025-12-08_02-32-10": {
                          Time: "2025-12-08_02-32-10",
                          cpu: 11.4,
                          ram: 41.7,
                          storage: 88.8,
                          discoUso: 2.3,
                          gpu: 3.24,
                        },
                        "2025-12-08_02-33-19": {
                          Time: "2025-12-08_02-33-19",
                          cpu: 14.2,
                          ram: 41.5,
                          storage: 88.8,
                          discoUso: 0.3,
                          gpu: 4.47,
                        },
                        "2025-12-08_02-34-28": {
                          Time: "2025-12-08_02-34-28",
                          cpu: 11.3,
                          ram: 41.3,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 3.48,
                        },
                      },
                      {
                        "2025-12-08_02-35-38": {
                          Time: "2025-12-08_02-35-38",
                          cpu: 11.4,
                          ram: 41.4,
                          storage: 88.8,
                          discoUso: 0.2,
                          gpu: 2.62,
                        },
                        "2025-12-08_02-36-47": {
                          Time: "2025-12-08_02-36-47",
                          cpu: 19.4,
                          ram: 41.6,
                          storage: 88.8,
                          discoUso: 0.8,
                          gpu: 8.87,
                        },
                        "2025-12-08_02-37-55": {
                          Time: "2025-12-08_02-37-55",
                          cpu: 19.6,
                          ram: 41.7,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 4.14,
                        },
                        "2025-12-08_02-39-04": {
                          Time: "2025-12-08_02-39-04",
                          cpu: 14.6,
                          ram: 41.8,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 2.35,
                        },
                        "2025-12-08_02-40-13": {
                          Time: "2025-12-08_02-40-13",
                          cpu: 10.5,
                          ram: 42.0,
                          storage: 88.8,
                          discoUso: 0.4,
                          gpu: 5.02,
                        },
                      },
                      {
                        "2025-12-08_02-41-23": {
                          Time: "2025-12-08_02-41-23",
                          cpu: 10.3,
                          ram: 41.9,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 5.21,
                        },
                        "2025-12-08_02-42-32": {
                          Time: "2025-12-08_02-42-32",
                          cpu: 11.4,
                          ram: 40.7,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 5.97,
                        },
                        "2025-12-08_02-43-40": {
                          Time: "2025-12-08_02-43-40",
                          cpu: 14.3,
                          ram: 40.8,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 1.95,
                        },
                        "2025-12-08_02-44-49": {
                          Time: "2025-12-08_02-44-49",
                          cpu: 15.6,
                          ram: 40.8,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 7.19,
                        },
                        "2025-12-08_02-45-58": {
                          Time: "2025-12-08_02-45-58",
                          cpu: 15.2,
                          ram: 40.8,
                          storage: 88.8,
                          discoUso: 0.6,
                          gpu: 7.88,
                        },
                      },
                      {
                        "2025-12-08_02-47-08": {
                          Time: "2025-12-08_02-47-08",
                          cpu: 12.0,
                          ram: 40.9,
                          storage: 88.8,
                          discoUso: 1.0,
                          gpu: 4.62,
                        },
                        "2025-12-08_02-48-17": {
                          Time: "2025-12-08_02-48-17",
                          cpu: 10.0,
                          ram: 40.8,
                          storage: 88.8,
                          discoUso: 0.9,
                          gpu: 4.95,
                        },
                        "2025-12-08_02-49-25": {
                          Time: "2025-12-08_02-49-25",
                          cpu: 11.7,
                          ram: 40.9,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 10.3,
                        },
                        "2025-12-08_02-50-33": {
                          Time: "2025-12-08_02-50-33",
                          cpu: 20.4,
                          ram: 41.0,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 7.5,
                        },
                        "2025-12-08_02-51-41": {
                          Time: "2025-12-08_02-51-41",
                          cpu: 18.4,
                          ram: 41.2,
                          storage: 88.8,
                          discoUso: 0.2,
                          gpu: 17.56,
                        },
                      },
                      {
                        "2025-12-08_02-52-51": {
                          Time: "2025-12-08_02-52-51",
                          cpu: 16.9,
                          ram: 41.2,
                          storage: 88.8,
                          discoUso: 0.2,
                          gpu: 1.38,
                        },
                        "2025-12-08_02-53-58": {
                          Time: "2025-12-08_02-53-58",
                          cpu: 6.7,
                          ram: 40.6,
                          storage: 88.8,
                          discoUso: 0.7,
                          gpu: 0.15,
                        },
                        "2025-12-08_02-55-07": {
                          Time: "2025-12-08_02-55-07",
                          cpu: 13.2,
                          ram: 41.2,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 5.52,
                        },
                        "2025-12-08_02-56-16": {
                          Time: "2025-12-08_02-56-16",
                          cpu: 14.3,
                          ram: 41.3,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 0.08,
                        },
                        "2025-12-08_02-57-23": {
                          Time: "2025-12-08_02-57-23",
                          cpu: 11.2,
                          ram: 41.3,
                          storage: 88.8,
                          discoUso: 0.5,
                          gpu: 0.16,
                        },
                      },
                      {
                        "2025-12-08_02-58-33": {
                          Time: "2025-12-08_02-58-33",
                          cpu: 13.4,
                          ram: 41.7,
                          storage: 88.8,
                          discoUso: 0.2,
                          gpu: 3.81,
                        },
                        "2025-12-08_02-59-42": {
                          Time: "2025-12-08_02-59-42",
                          cpu: 10.0,
                          ram: 41.3,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 1.46,
                        },
                        "2025-12-08_03-00-49": {
                          Time: "2025-12-08_03-00-49",
                          cpu: 9.3,
                          ram: 41.1,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 1.29,
                        },
                        "2025-12-08_03-01-58": {
                          Time: "2025-12-08_03-01-58",
                          cpu: 11.7,
                          ram: 41.1,
                          storage: 88.8,
                          discoUso: 0.1,
                          gpu: 3.97,
                        },
                        "2025-12-08_03-03-06": {
                          Time: "2025-12-08_03-03-06",
                          cpu: 11.4,
                          ram: 41.7,
                          storage: 88.8,
                          discoUso: 0.3,
                          gpu: 3.17,
                        },
                      },
                      {
                        "2025-12-08_03-04-16": {
                          Time: "2025-12-08_03-04-16",
                          cpu: 12.1,
                          ram: 41.8,
                          storage: 88.9,
                          discoUso: 0.2,
                          gpu: 7.02,
                        },
                        "2025-12-08_03-05-24": {
                          Time: "2025-12-08_03-05-24",
                          cpu: 10.1,
                          ram: 42.1,
                          storage: 88.9,
                          discoUso: 0.3,
                          gpu: 2.07,
                        },
                        "2025-12-08_03-06-31": {
                          Time: "2025-12-08_03-06-31",
                          cpu: 8.3,
                          ram: 41.7,
                          storage: 88.9,
                          discoUso: 0.2,
                          gpu: 0.99,
                        },
                        "2025-12-08_03-07-39": {
                          Time: "2025-12-08_03-07-39",
                          cpu: 6.8,
                          ram: 41.7,
                          storage: 88.9,
                          discoUso: 0.1,
                          gpu: 2.16,
                        },
                        "2025-12-08_03-08-47": {
                          Time: "2025-12-08_03-08-47",
                          cpu: 11.8,
                          ram: 42.7,
                          storage: 88.9,
                          discoUso: 0.3,
                          gpu: 1.7,
                        },
                      },
                      {
                        "2025-12-08_03-09-57": {
                          Time: "2025-12-08_03-09-57",
                          cpu: 8.6,
                          ram: 42.2,
                          storage: 88.9,
                          discoUso: 0.0,
                          gpu: 1.25,
                        },
                        "2025-12-08_03-11-05": {
                          Time: "2025-12-08_03-11-05",
                          cpu: 6.5,
                          ram: 41.7,
                          storage: 88.9,
                          discoUso: 0.1,
                          gpu: 0.33,
                        },
                        "2025-12-08_03-12-12": {
                          Time: "2025-12-08_03-12-12",
                          cpu: 8.7,
                          ram: 41.6,
                          storage: 88.9,
                          discoUso: 0.1,
                          gpu: 0.71,
                        },
                        "2025-12-08_03-13-20": {
                          Time: "2025-12-08_03-13-20",
                          cpu: 7.4,
                          ram: 41.6,
                          storage: 88.9,
                          discoUso: 0.0,
                          gpu: 2.59,
                        },
                        "2025-12-08_03-14-28": {
                          Time: "2025-12-08_03-14-28",
                          cpu: 8.8,
                          ram: 41.3,
                          storage: 88.9,
                          discoUso: 0.1,
                          gpu: 2.95,
                        },
                      },
                      {
                        "2025-12-08_03-15-38": {
                          Time: "2025-12-08_03-15-38",
                          cpu: 13.2,
                          ram: 41.8,
                          storage: 88.9,
                          discoUso: 0.3,
                          gpu: 2.44,
                        },
                        "2025-12-08_03-16-46": {
                          Time: "2025-12-08_03-16-46",
                          cpu: 11.6,
                          ram: 41.8,
                          storage: 88.9,
                          discoUso: 0.1,
                          gpu: 3.79,
                        },
                        "2025-12-08_03-17-54": {
                          Time: "2025-12-08_03-17-54",
                          cpu: 11.7,
                          ram: 41.9,
                          storage: 88.9,
                          discoUso: 0.8,
                          gpu: 4.35,
                        },
                        "2025-12-08_03-19-02": {
                          Time: "2025-12-08_03-19-02",
                          cpu: 12.2,
                          ram: 41.9,
                          storage: 88.9,
                          discoUso: 0.4,
                          gpu: 4.57,
                        },
                        "2025-12-08_03-20-10": {
                          Time: "2025-12-08_03-20-10",
                          cpu: 12.2,
                          ram: 41.9,
                          storage: 88.9,
                          discoUso: 0.8,
                          gpu: 4.4,
                        },
                      },
                      {
                        "2025-12-08_03-21-21": {
                          Time: "2025-12-08_03-21-21",
                          cpu: 17.0,
                          ram: 41.9,
                          storage: 88.9,
                          discoUso: 0.7,
                          gpu: 2.61,
                        },
                        "2025-12-08_03-22-30": {
                          Time: "2025-12-08_03-22-30",
                          cpu: 22.0,
                          ram: 42.0,
                          storage: 88.9,
                          discoUso: 0.6,
                          gpu: 9.99,
                        },
                        "2025-12-08_03-23-38": {
                          Time: "2025-12-08_03-23-38",
                          cpu: 17.9,
                          ram: 42.2,
                          storage: 88.9,
                          discoUso: 1.0,
                          gpu: 2.82,
                        },
                        "2025-12-08_03-24-47": {
                          Time: "2025-12-08_03-24-47",
                          cpu: 11.2,
                          ram: 42.1,
                          storage: 88.9,
                          discoUso: 0.8,
                          gpu: 2.11,
                        },
                        "2025-12-08_03-25-55": {
                          Time: "2025-12-08_03-25-55",
                          cpu: 10.1,
                          ram: 42.3,
                          storage: 88.9,
                          discoUso: 1.1,
                          gpu: 4.99,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            idEmpresas: 2,
            ativo: 1,
            nome: "DataCorp Serviços",
            zonas: [
              {
                Arquitetura_idArquitetura: 1,
                nome: "eu-west-1a",
                Modelo_idModelo: 3,
                arquiteturas: [
                  {
                    qtd_DISCO: 1,
                    idArquitetura: 1,
                    CPU: 4,
                    DISCO: 256,
                    SO: "Linux",
                    GPU: 0,
                    RAM: 16,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-b1",
                    qtd_DISCO: 1,
                    processo: "Treinamento",
                    ip: "10.0.1.1",
                    nome: "Model-B1",
                    whitelists: [
                      {
                        nome: null,
                        Modelo_idModelo: 3,
                      },
                    ],
                    slas: [
                      {
                        qtd_DISCO: 1,
                        CPU: 4,
                        DISCO: 256,
                        Modelo_idModelo: 3,
                        GPU: 0,
                        RAM: 16,
                      },
                    ],
                    tickets: [
                      {
                        id: "10425",
                        self: "https://cortexsptech.atlassian.net/rest/api/3/issue/10425",
                        key: "CTX-62",
                        fields: {
                          issuetype: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issuetype/10014",
                            id: "10014",
                          },
                          project: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/project/10001",
                            id: "10001",
                            key: "CTX",
                          },
                          statusCategory: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/2",
                            id: 2,
                            key: "new",
                          },
                          watches: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-62/watchers",
                          },
                          customfield_10060: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10036",
                            id: "10036",
                          },
                          created: "2025-12-08T03:40:12.007-0300",
                          priority: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/priority/2",
                            id: "2",
                          },
                          labels: ["cpu", "ram"],
                          updated: "2025-12-08T03:43:33.689-0300",
                          status: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/status/1",
                            id: "1",
                            statusCategory: {
                              self: "https://cortexsptech.atlassian.net/rest/api/3/statuscategory/2",
                              id: 2,
                              key: "new",
                            },
                          },
                          customfield_10093: "3;2;1",
                          description: {
                            content: [
                              {
                                content: [
                                  {
                                    text: "Alerta de Utilização Crítica - Cortex ",
                                  },
                                ],
                              },
                              {
                                content: [
                                  {
                                    text: "O modelo: GenAi- na máquina: SV-SP02-REC-03 ultrapassou o limite crítico de:         ",
                                  },
                                ],
                              },
                              {
                                content: [
                                  {
                                    text: "- cpu  - com o uso de: 97% - em: 2025-12-08_10-30-02         ",
                                  },
                                ],
                              },
                              {
                                content: [
                                  {
                                    text: "- ram - com o uso de: 96% - em: 2025-12-08_10-33-02",
                                  },
                                ],
                              },
                            ],
                          },
                          customfield_10059: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10035",
                            value: "Incidente",
                            id: "10035",
                          },
                          summary:
                            "ALERTA CRÍTICO: Modelo GenAi Máquina SV-SP02-REC-03 - Última Atualização 2025-12-08_10-30-05",
                          creator: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ab10e3d25-dd0f-4f34-8625-a71259bec937",
                          },
                          reporter: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/user?accountId=712020%3Ab10e3d25-dd0f-4f34-8625-a71259bec937",
                          },
                          customfield_10044: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/customFieldOption/10021",
                            id: "10021",
                          },
                          votes: {
                            self: "https://cortexsptech.atlassian.net/rest/api/3/issue/CTX-62/votes",
                          },
                        },
                      },
                    ],
                  },
                ],
              },
              {
                Arquitetura_idArquitetura: 2,
                nome: "eu-west-1b",
                Modelo_idModelo: 4,
                arquiteturas: [
                  {
                    qtd_DISCO: 2,
                    idArquitetura: 2,
                    CPU: 8,
                    DISCO: 512,
                    SO: "Linux",
                    GPU: 4,
                    RAM: 32,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-b2",
                    qtd_DISCO: 2,
                    processo: "Inferencia",
                    ip: "10.0.1.2",
                    nome: "Model-B2",
                    slas: [
                      {
                        qtd_DISCO: 2,
                        CPU: 8,
                        DISCO: 512,
                        Modelo_idModelo: 4,
                        GPU: 4,
                        RAM: 32,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            idEmpresas: 3,
            ativo: 1,
            nome: "AI Solutions Ltda",
            zonas: [
              {
                Arquitetura_idArquitetura: 3,
                nome: "br-south-1a",
                Modelo_idModelo: 5,
                arquiteturas: [
                  {
                    qtd_DISCO: 4,
                    idArquitetura: 3,
                    CPU: 16,
                    DISCO: 1024,
                    SO: "Windows",
                    GPU: 8,
                    RAM: 64,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-c1",
                    qtd_DISCO: 1,
                    processo: "Treinamento",
                    ip: "10.0.2.1",
                    nome: "Model-C1",
                    whitelists: [
                      {
                        nome: null,
                        Modelo_idModelo: 5,
                      },
                    ],
                    slas: [
                      {
                        qtd_DISCO: 4,
                        CPU: 16,
                        DISCO: 1024,
                        Modelo_idModelo: 5,
                        GPU: 8,
                        RAM: 64,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            idEmpresas: 4,
            ativo: 1,
            nome: "NetCompute Brasil",
            zonas: [
              {
                Arquitetura_idArquitetura: 1,
                nome: "ap-south-1a",
                Modelo_idModelo: 7,
                arquiteturas: [
                  {
                    qtd_DISCO: 1,
                    idArquitetura: 1,
                    CPU: 4,
                    DISCO: 256,
                    SO: "Linux",
                    GPU: 0,
                    RAM: 16,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-d1",
                    qtd_DISCO: 1,
                    processo: "Treinamento",
                    ip: "10.0.3.1",
                    nome: "Model-D1",
                    whitelists: [
                      {
                        nome: null,
                        Modelo_idModelo: 7,
                      },
                    ],
                    slas: [
                      {
                        qtd_DISCO: 4,
                        CPU: 16,
                        DISCO: 1024,
                        Modelo_idModelo: 7,
                        GPU: 8,
                        RAM: 64,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            idEmpresas: 5,
            ativo: 1,
            nome: "Edge Systems Tech",
            zonas: [
              {
                Arquitetura_idArquitetura: 2,
                nome: "us-central-1a",
                Modelo_idModelo: 9,
                arquiteturas: [
                  {
                    qtd_DISCO: 2,
                    idArquitetura: 2,
                    CPU: 8,
                    DISCO: 512,
                    SO: "Linux",
                    GPU: 4,
                    RAM: 32,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-e1",
                    qtd_DISCO: 1,
                    processo: "Treinamento",
                    ip: "10.0.4.1",
                    nome: "Model-E1",
                    slas: [
                      {
                        qtd_DISCO: 4,
                        CPU: 16,
                        DISCO: 1024,
                        Modelo_idModelo: 9,
                        GPU: 8,
                        RAM: 64,
                      },
                    ],
                  },
                ],
              },
              {
                Arquitetura_idArquitetura: 3,
                nome: "us-central-1b",
                Modelo_idModelo: 10,
                arquiteturas: [
                  {
                    qtd_DISCO: 4,
                    idArquitetura: 3,
                    CPU: 16,
                    DISCO: 1024,
                    SO: "Windows",
                    GPU: 8,
                    RAM: 64,
                  },
                ],
                modelos: [
                  {
                    hostname: "host-e2",
                    qtd_DISCO: 2,
                    processo: "Inferencia",
                    ip: "10.0.4.2",
                    nome: "Model-E2",
                    slas: [
                      {
                        qtd_DISCO: 8,
                        CPU: 32,
                        DISCO: 2048,
                        Modelo_idModelo: 10,
                        GPU: 16,
                        RAM: 128,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      return;
    } catch (e) {}

    res.status(500).send("Erro ao buscar arquivo: " + err.message);
    return;
  }
}

module.exports = { lerArquivo };
