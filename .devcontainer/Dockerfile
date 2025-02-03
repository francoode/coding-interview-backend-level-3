FROM node:20

WORKDIR /workspace

COPY package*.json .

RUN npm install --verbose

EXPOSE 3002

CMD ["npm", "run", "dev"]