# Puck Builder (SCORM Course Template)

Uma ferramenta de autoria e template de curso utilizando o Puck Editor e exportação para SCORM.
Este projeto é dividido em um **frontend** (React + Vite) e um **backend** (Node.js/Express + MongoDB).

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [MongoDB](https://www.mongodb.com/) (rodando localmente ou uma conta no MongoDB Atlas)

## Como rodar o projeto localmente

Siga os passos abaixo para clonar, configurar e executar a aplicação em sua máquina.

### 1. Backend (API & Banco de Dados)

O backend precisa estar rodando para que o frontend consiga se comunicar com o banco de dados e salvar os dados.

1. Abra seu terminal, navegue até a raiz do projeto e entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Configuração das Variáveis de Ambiente:
   - Dentro da pasta `backend`, crie um arquivo chamado `.env`.
   - Você pode usar o arquivo `.env.example` como base. 
   - Preencha o arquivo `.env` com a sua string de conexão do MongoDB e a porta desejada:
     ```env
     PORT=3000
     MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster...mongodb.net/<nome_do_banco>?retryWrites=true&w=majority
     ```

4. Inicie o servidor de desenvolvimento do backend:
   ```bash
   npm run dev
   ```
   *O backend deve iniciar sem erros e conectar ao banco de dados.*

### 2. Frontend (Aplicação e Editor)

O frontend é onde a interface do Puck Builder e o template do curso ficam.

1. Em um **novo terminal**, a partir da raiz do projeto, navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências do frontend:
   ```bash
   npm install
   ```
3. Verifique as Variáveis de Ambiente:
   - A pasta `frontend` já possui um arquivo `.env`.
   - Certifique-se de que a variável `VITE_API_URL` aponta corretamente para a URL onde seu backend está rodando (por padrão `http://localhost:3000`).

4. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   npm run scorm-dev
   ```
   *O terminal mostrará a URL local (geralmente http://localhost:5173). Acesse-a no seu navegador.*

