FROM node:22.14.0
WORKDIR /spotto/books
COPY package*.json /spotto/books
RUN npm install
COPY . .

EXPOSE 9000

CMD ["sh", "-c", "npm run migrate && npm run start"]