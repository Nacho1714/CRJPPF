FROM node:20.8.1-alpine3.18 as dev
EXPOSE 3000
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/
RUN npm install -g npm@8
RUN npm install
CMD [ "npm", "run", "start:dev" ]

FROM node:20.8.1-alpine3.18 as dev-deps
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/
RUN npm install -g npm@8
RUN npm install

FROM node:20.8.1-alpine3.18 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.8.1-alpine3.18 as prod-deps
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/
RUN npm install -g npm@8
RUN npm install --prod

FROM node:20.8.1-alpine3.18 as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN apk add --no-cache tzdata
ENV TZ=America/Argentina/Buenos_Aires
CMD [ "node","dist/main.js" ]