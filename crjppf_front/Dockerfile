FROM node:20.11.0
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5173
CMD [ "npm", "run", "dev" ]

# FROM node:20.8.1-alpine3.18 as dev
# EXPOSE 5173
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# CMD [ "npm", "run", "dev" ]

# FROM node:20.8.1-alpine3.18 as dev-deps
# WORKDIR /app
# COPY package.json ./
# RUN npm install

# FROM node:20.8.1-alpine3.18 as builder
# WORKDIR /app
# COPY --from=dev-deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# FROM nginx:1.23.3 as prod
# EXPOSE 80
# COPY --from=builder /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# CMD [ "nginx","-g", "daemon off;" ]


