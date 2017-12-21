FROM node:9
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD node /faker/index.js
EXPOSE 3000
CMD [ "npm", "start" ]