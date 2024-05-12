# API REST - NestJS | PrismaORM | PostgreSQL | JWT | Swagger 

|http://localhost:3000|
|-------------------------|

## Description

La API desarrollada con NestJS proporcionará una plataforma segura y eficiente para el registro y consulta de visitantes en "La Caja de Retiros, Jubilaciones y Pensiones de la Policía Federal". Al implementar las mejores prácticas de seguridad y utilizar tecnologías modernas, se garantizará la integridad y confidencialidad de los datos, cumpliendo con los más altos estándares de seguridad y privacidad.

## Tecnologías Utilizadas

- **NestJS**: Framework de Node.js para construir aplicaciones web escalables y eficientes en el lado del servidor.
- **PrismaORM**: Biblioteca ORM para TypeScript y JavaScript que se utiliza con Node.js y en el navegador.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional de código abierto y ampliamente utilizado.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios y la generación de tokens de acceso.
- **Swagger**: Para la documentación automática de la API.

## Levantar Proyecto Desarrollo

### Instalar Nest.js CLI

```bash
$ npm install -g @nestjs/cli
```

### Clonar el repositorio

```bash
$ git clone <URL>
```

### Instalar dependencias

```bash
$ npm install
```
- #### Clonar archivo .env.template y renombrar a .env
- #### Completar las variables de entorno

### Correr el proyecto

```bash
$ npm run start:dev
```

---
## Docker

|Tener en cuenta que primero se debe construir y correr la imagen de la DB|
|-------------------------------------------------------------------------|

### Construir imagen

```bash
$ docker build -t crjppf-api . --no-cache
```

### Network

- Chequear si existe la red crjppf-net
```bash
$ docker network ls
```
- Si no existe, crear la red
```bash
$ docker network create crjppf-net
```

### Correr contenedor

```bash
docker container run `
--name api `
-dp 3000:3000 `
--network crjppf-net `
-e DATABASE_URL=postgresql://myuser:mypassword@db:5432/mydb `
-e HOST_API=http://localhost:3000 `
-e PORT=3000 `
-e JWT_SECRET="6K7sT4$B&nYp@9*3@Rd8N!sJmWg%5^" `
-e CLIENT_URL=http://front:5173 `
-v C:/Users/barro/OneDrive/Documentos/imagenes/:/app/static/visitor `
caja-api
```