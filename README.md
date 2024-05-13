# Documentación

## Servicios

1. ### DB

    | Variable | Valor por defecto | Descripción |
    | --- | --- | --- |
    | DB_VERSION | latest | Versión de la imagen de la base de datos |
    | PORT_DB | 5432 | Puerto de la base de datos |
    | POSTGRES_USER | postgres | Usuario de la base de datos |
    | POSTGRES_PASSWORD | postgres | Contraseña de la base de datos |
    | POSTGRES_DB | postgres | Nombre de la base de datos |

    #### Conexion a la base de datos

    - `HOST:` 127.0.0.1
    - `PORT:` ${PORT_DB}
    - `USER:` ${POSTGRES_USER}
    - `PASSWORD:` ${POSTGRES_PASSWORD}
    - `SCHEMA:` ${POSTGRES_DB}

    #### Configurar TIMEZONE

    Navegar hasta `postgres\postgresql.conf` y setear la variable timezone por el valor ***'America/Argentina/Buenos_Aires'***

2. ### API: http://localhost:${PORT_API}

    | Variable | Valor por defecto | Descripción |
    | --- | --- | --- |
    | API_VERSION | latest | Versión de la imagen de la API |
    | PORT_API | 3000 | Puerto de la API |
    | DATABASE_URL | postgres://postgres:postgres@db:5432/postgres | URL de conexión a la base de datos |
    | HOST_API | http://localhost:3000 | Host de la API |
    | JWT_SECRET | $B&nYp@9*3@Rd8N!sJmWg%5^ | Clave secreta para JWT |
    | CLIENT_URL | http://localhost:5173 | URL del cliente |
    | IMAGE_FOLDER_PATH | /Users/barro/OneDrive/Documentos/imagenes/ | Ruta de la carpeta de imágenes |

3. ### FRONT: http://localhost:${PORT_FRONT}

    | Variable | Valor por defecto | Descripción |
    | --- | --- | --- |
    | FRONT_VERSION | latest | Versión de la imagen del cliente |
    | PORT_FRONT | 5173 | Puerto del cliente |
    | VITE_API_URL | http://api:3000 | URL de la API |

4. ### PGADMIN: http://localhost:8080

    | Variable | Valor por defecto | Descripción |
    | --- | --- | --- |
    | PGADMIN_DEFAULT_EMAIL | root@google.com | Correo de administrador |
    | PGADMIN_DEFAULT_PASSWORD | 12345 | Contraseña de administrador |


## Docker Compose

```yaml
version: '3'

services:

    db:
        container_name: crjppf-db
        image: nachodocker1714/crjppf-db:${DB_VERSION}
        restart: always
        ports:
            - ${PORT_DB}:${PORT_DB}
        volumes:
            - ./postgres:/var/lib/postgresql/data
        environment:
            POSTGRES_USER: ${POSTGRES_USER}    
            POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}            
            POSTGRES_DB: ${POSTGRES_DB}  

    pdAdmin:
        container_name: pgadmin4
        image: dpage/pgadmin4
        restart: always
        depends_on:
            - db
        ports:
            - 8080:80
        environment:
            PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
            PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
        volumes:
            - ./pgadmin:/var/lib/pgadmin
            - ./pgadmin:/certs/server.cert
            - ./pgadmin:/certs/server.key
            - ./pgadmin:/pgadmin4/servers.json

    api:
        container_name: crjppf-api
        image: nachodocker1714/crjppf-api:${API_VERSION}
        restart: always
        depends_on:
            - db
        ports:
            - ${PORT_API}:${PORT_API}
        environment:
            DATABASE_URL: ${DATABASE_URL}
            HOST_API: ${HOST_API}
            PORT_API: ${PORT_API}
            JWT_SECRET: ${JWT_SECRET}
            CLIENT_URL: ${CLIENT_URL}
        volumes:
            - ${IMAGE_FOLDER_PATH}:/app/static/visitor

    front:
        container_name: crjppf-front
        image: nachodocker1714/crjppf-front:${FRONT_VERSION}
        restart: always
        depends_on:
            - db
            - api
        ports:
            - ${PORT_FRONT}:${PORT_FRONT}
        environment:
            VITE_API_URL: ${VITE_API_URL}
```

## Comandos: 

|***Navegar hasta el `docker-compose.yml`***|
|-------------------------------------------|

### Correr el proyecto

```bash
docker compose up -d
```

### Detener el proyecto

```bash
docker compose down
```

### Borrar volúmenes

```bash
docker compose down -volumes
```

