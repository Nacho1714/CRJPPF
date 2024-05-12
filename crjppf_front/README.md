# React + Vite 

|http://localhost:5173|
|---------------------|

## Levantar Proyecto Desarrollo

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
$ npm run dev
```

---
## Docker

|Tener en cuenta que primero se debe construir y correr la imagen de la API|
|--------------------------------------------------------------------------|

### Construir imagen

```bash
$ docker build -t crjppf-front . --no-cache
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
--name front `
-dp 5173:5173 `
--network crjppf-net `
-e VITE_API_URL=http://api:3000 `
crjppf-front
```