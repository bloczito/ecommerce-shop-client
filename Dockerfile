FROM node:18-alpine3.15

RUN npm install -g serve

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["serve", "-s", "build", "-l", "3000"]
