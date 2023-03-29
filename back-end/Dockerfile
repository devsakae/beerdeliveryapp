FROM node:16.0-alpine AS fazo4-backend

WORKDIR /back-end

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]