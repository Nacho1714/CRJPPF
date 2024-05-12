# DB - PostgreSQL 

## Clonar el repositorio

```bash
$ git clone <URL>
```
- #### Clonar archivo .env.template y renombrar a .env
- #### Completar las variables de entorno

## Construir imagen

```bash
$ docker build -t crjppf-api . --no-cache
```

## Network

- Chequear si existe la red crjppf-net
```bash
$ docker network ls
```
- Si no existe, crear la red
```bash
$ docker network create crjppf-net
```

## Correr contenedor

```bash
docker container run `
--name db `
-dp 5432:5432 `
--network crjppf-net `
-v ./postgres:/var/lib/postgresql/data `
caja-db
```

## Datos de conexión

|Variable|Default|env|
|---|---|---|
|HOST|127.0.0.1|127.0.0.1|
|PORT|5432|${PORT}|
|USER|myuser|${POSTGRES_USER}|
|PASSWORD|mypassword|${POSTGRES_PASSWORD}|
|SCHEMA|mydb|${POSTGRES_DB}|

---
<!-- ![alt text](image.png) -->
![Descripción de la imagen](diagram%20(DER)/cajapf_access.png)


