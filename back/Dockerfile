# Usa uma versão leve do Node.js (Alpine Linux)
FROM node:22-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# 1. Copia apenas os arquivos de dependência primeiro
# Isso aproveita o cache do Docker se você não mudou as bibliotecas
COPY package*.json ./

# 2. Instala as dependências
RUN npm install

# 3. Copia o restante do código do projeto para dentro do container
COPY . .

# Expõe a porta que o Express vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
# (Vai rodar o script "start" do package.json)
CMD ["npm", "start"]
