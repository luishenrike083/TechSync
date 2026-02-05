# 🚀 TechSync

## 📌 Visão Geral

O **TechSync** é um projeto acadêmico desenvolvido no contexto da disciplina **Desenvolvimento Web**, pertencente ao curso de **Redes de Computadores**. O objetivo principal do projeto é aplicar, de forma prática, conceitos fundamentais de desenvolvimento web aliados a noções de infraestrutura, monitoramento e organização de serviços, simulando um ambiente próximo ao encontrado em cenários reais de TI.

O sistema foi projetado para demonstrar a integração entre **frontend**, **backend simulado**, **infraestrutura** e **monitoramento**, oferecendo uma solução web organizada, funcional e escalável, mesmo em um contexto acadêmico.

---

## 🎯 Objetivos do Projeto

* Aplicar conceitos de desenvolvimento web aprendidos em sala de aula;
* Simular um ambiente de infraestrutura e monitoramento de serviços;
* Integrar frontend com dados dinâmicos;
* Trabalhar em equipe utilizando controle de versão (Git/GitHub);
* Desenvolver documentação técnica clara e profissional;
* Preparar o aluno para cenários próximos ao mercado de trabalho.

---

## 🧩 Funcionalidades Principais

O TechSync oferece as seguintes funcionalidades:

* 📊 **Dashboard interativo** para visualização de dados;
* 🖥️ **Gerenciamento de dispositivos/serviços** simulados;
* 📁 **Consumo de dados via arquivos JSON**, simulando um backend;
* 📈 **Integração com ferramentas de monitoramento** (ex: Grafana);
* ⚙️ **Configurações de infraestrutura** utilizando arquivos de provisionamento;
* 🌐 **Interface web responsiva**, desenvolvida com boas práticas de UI;
* 🧪 Ambiente preparado para testes e simulações.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

### 🔹 Frontend

* **HTML5** – Estruturação das páginas;
* **CSS3** – Estilização e responsividade;
* **JavaScript (Vanilla)** – Lógica de interação e manipulação de dados.

### 🔹 Backend / Dados

* **db.json** – Simulação de backend para armazenamento e leitura de dados;
* **Node.js (estrutura de apoio)** – Organização do projeto.

### 🔹 Infraestrutura e Monitoramento

* **Docker / Docker Compose** – Orquestração de serviços;
* **Grafana** – Visualização e monitoramento de métricas;
* **Provisionamento automatizado** via arquivos de configuração.

### 🔹 Versionamento

* **Git** – Controle de versão;
* **GitHub** – Repositório e colaboração em equipe.

---

---

## 🗂️ Estrutura do Projeto

A organização do repositório segue uma estrutura modular, facilitando manutenção e entendimento:

```
TechSync/
├── front/                     # Arquivos do frontend (HTML, CSS, JS)
├── back/                      # Estrutura de backend/dados simulados
├── grafana_provisioning/      # Configurações e dashboards do Grafana
├── infra/                     # Scripts e arquivos de infraestrutura
│   └── cliente-debian/        # Ambiente cliente simulado
├── docker-compose.yml         # Orquestração dos serviços
├── package.json               # Dependências do projeto
└── README.md                  # Documentação do projeto
```

---
## 🏗️ Arquitetura do Sistema

A solução é composta por múltiplos serviços interconectados via rede Docker:
| Serviço | Tecnologia | Porta | Descrição |
| --- | --- | --- | --- |
| **Frontend** | Nginx | 8000 | Interface do usuário e landing page |
| **Backend** | Node.js | 3000 | API REST e lógica de negócio |
| **Database** | MySQL 8.0 | 3306 | Persistência de dados |
| **Zabbix** | Zabbix Appliance | 8081 | Servidor de monitoramento |
| **Grafana** | Grafana OSS | 3001 | Visualização de métricas |

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

* Git
* Docker
* Docker Compose
* Navegador web moderno (Chrome, Firefox, Edge, etc.)

---

## ▶️ Como Executar o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/luishenrike083/TechSync.git
```

```bash
cd TechSync
```

### 2️⃣ Subir os serviços com Docker

```bash
docker-compose up -d
```

### 3️⃣ Acessar o sistema

* Frontend: abra o arquivo `index.html` ou acesse via servidor configurado;
* Grafana: `http://localhost:3000` (se configurado no docker-compose).

---

## 🧪 Exemplos de Uso

* Visualizar dashboards de monitoramento;
* Simular cadastro e visualização de dispositivos;
* Analisar métricas exibidas no Grafana;
* Testar integração entre frontend e dados simulados.

---

## 📈 Possíveis Evoluções Futuras

* Implementação de backend real (API REST);
* Banco de dados relacional ou NoSQL;
* Deploy em nuvem;
* Monitoramento real de serviços e dispositivos;
* Testes automatizados.

---

## 🤝 Trabalho em Equipe

Este projeto foi desenvolvido de forma colaborativa, utilizando boas práticas de versionamento e divisão de tarefas entre os integrantes do grupo.

---

## 👨‍💻 Autores

Projeto desenvolvido por:

* **Luis Henrike**
* **Hugo Antônio**
* **João Victor Coelho Trigueiro**

---

## 📄 Licença

Este projeto é de caráter **acadêmico** e foi desenvolvido exclusivamente para fins educacionais.
