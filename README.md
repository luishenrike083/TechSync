#  TechSync

##  Visão Geral

O **TechSync** é um projeto acadêmico desenvolvido no contexto da disciplina **Desenvolvimento Web**, pertencente ao curso de **Redes de Computadores**. O objetivo principal do projeto é aplicar, de forma prática, conceitos fundamentais de desenvolvimento web aliados a noções de infraestrutura, monitoramento e organização de serviços, simulando um ambiente próximo ao encontrado em cenários reais de TI.

O sistema foi projetado para demonstrar a integração entre **frontend**, **backend simulado**, **infraestrutura virtualizada** e **monitoramento**, oferecendo uma solução web organizada, funcional e escalável.

---

##  Objetivos do Projeto

* Aplicar conceitos de desenvolvimento web aprendidos em sala de aula;
* Simular um ambiente de infraestrutura e monitoramento de serviços;
* Integrar frontend com dados dinâmicos e métricas em tempo real;
* Trabalhar em equipe utilizando controle de versão (Git/GitHub);
* Desenvolver documentação técnica clara e profissional;
* Preparar o aluno para cenários próximos ao mercado de trabalho.

---

## 🧩 Funcionalidades Principais

O TechSync oferece as seguintes funcionalidades:

* 📊 **Dashboard interativo** para visualização de dados gerenciais;
* 🖥️ **Gerenciamento de dispositivos/serviços** simulados em máquinas virtuais;
* 📁 **Consumo de dados via API**, simulando um backend REST;
* 📈 **Integração com ferramentas de monitoramento** (Zabbix e Grafana);
* ⚙️ **Configurações de infraestrutura** utilizando arquivos de provisionamento;
* 🌐 **Interface web responsiva**, desenvolvida com boas práticas de UI;
* 🧪 Ambiente isolado preparado para testes e simulações de rede.

---

## 🛠️ Tecnologias Utilizadas

### 🔹 Frontend
* **HTML5** – Estruturação das páginas;
* **CSS3** – Estilização e responsividade;
* **JavaScript (Vanilla)** – Lógica de interação e manipulação de dados.

### 🔹 Backend / Dados
* **JSON Server / Node.js** – Simulação de API REST para persistência de dados;
* **MySQL 8.0** – Banco de dados para serviços de apoio.

### 🔹 Infraestrutura e Monitoramento
* **Docker / Docker Compose** – Orquestração de contêineres e serviços;
* **Vagrant / VirtualBox** – Virtualização das máquinas clientes;
* **Zabbix** – Coleta e monitoramento de ativos de rede;
* **Grafana** – Visualização avançada de métricas.

### 🔹 Versionamento
* **Git** – Controle de versão;
* **GitHub** – Repositório e colaboração em equipe.

---

##  Estrutura do Projeto

A organização do repositório segue uma estrutura modular:

```text
TechSync/
├── front/                     # Arquivos do frontend (HTML, CSS, JS)
├── back/                      # Estrutura da API e Banco de Dados
├── grafana_provisioning/      # Configurações e dashboards automáticos
├── infra/                     # Scripts e arquivos de infraestrutura
│   └── cliente-debian/        # Configuração da VM cliente simulada
├── docker-compose.yml         # Orquestração dos serviços principais
├── package.json               # Dependências do projeto
└── README.md                  # Documentação do projeto
```

---

##  Arquitetura do Sistema

A solução é composta por múltiplos serviços interconectados via rede Docker e Máquinas Virtuais:

| Serviço | Tecnologia | Porta Interna | Porta Externa | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | Nginx | 80 | 8000 | Interface do usuário e landing page |
| **Backend** | Node.js | 3000 | 3000 | API REST e lógica de negócio |
| **Database** | MySQL 8.0 | 3306 | 3306 | Persistência de dados |
| **Zabbix** | Zabbix Appliance | 80 | 8081 | Servidor de monitoramento |
| **Grafana** | Grafana OSS | 3000 | 3001 | Visualização de métricas |

---

##  Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

* **Git**
* **Docker** e **Docker Compose**
* **VirtualBox** e **Vagrant**
* Navegador web moderno

---

##  Como Executar o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone [https://github.com/luishenrike083/TechSync.git](https://github.com/luishenrike083/TechSync.git)
cd TechSync
```

### 2️⃣ Configurar Variáveis de Ambiente (Backend) ⚙️

Antes de subir os serviços, é necessário configurar as credenciais do banco de dados.
Crie um arquivo chamado **`.env`** dentro da pasta **`back/`** e cole o seguinte conteúdo:

```env
DATABASE_URL="mysql://root:root_pwd@localhost:3306/techsync_db"
PORT=3000
JWF_SECRET="senha_teste"
```

### 3️⃣ Ligar as Máquinas Virtuais (Clientes) ⚠️

Para que o monitoramento funcione, é necessário subir as máquinas clientes:

```bash
cd infra/cliente-debian
vagrant up
```

### 4️⃣ Subir os serviços com Docker

Volte para a raiz do projeto e inicie os contêineres:

```bash
cd ../../
docker-compose up -d
```

### 5️⃣ Acessar o sistema

* **Frontend:** [http://localhost:8000](http://localhost:8000)
* **Grafana:** [http://localhost:3001](http://localhost:3001)
* **Zabbix:** [http://localhost:8081](http://localhost:8081)

---

##  Credenciais Padrão

| Serviço | Usuário | Senha |
| :--- | :--- | :--- |
| **Zabbix** | `Admin` | `zabbix` |
| **Grafana** | `admin` | `admin` |

---

##  Exemplos de Uso

1.  **Monitoramento:** Acesse o Grafana para ver o status das VMs ligadas.
2.  **Gestão:** Utilize o Frontend para visualizar os dispositivos cadastrados.
3.  **Infraestrutura:** Teste desligar uma VM via VirtualBox e veja o alerta no Dashboard.

---

##  Autores

* **Luis Henrike**
* **Hugo Antônio**
* **João Victor Coelho Trigueiro**

---

##  Licença

Este projeto é de caráter **acadêmico** e foi desenvolvido exclusivamente para fins educacionais.