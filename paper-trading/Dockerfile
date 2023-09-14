FROM node:16 AS ui-build

WORKDIR /usr/app/client/
COPY package*.json ./
RUN npm install
COPY src/ ./src
COPY public/ ./public
RUN npm run build

FROM node:16 AS server-build
WORKDIR /usr/app/

COPY --from=ui-build /usr/app/client/build/ ./client/build/
WORKDIR /usr/app/server/

COPY package*.json ./
RUN npm install

COPY src/server.js ./

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]