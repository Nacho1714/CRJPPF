FROM postgres:15.3

ARG POSTGRES_USER=myuser
ARG POSTGRES_PASSWORD=mypassword
ARG POSTGRES_DB=mydb

ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

COPY 01_creation_tables.sql /docker-entrypoint-initdb.d
COPY triggers_function/credentials /docker-entrypoint-initdb.d
COPY triggers_function/is_active /docker-entrypoint-initdb.d
COPY triggers_function/10_generic.sql /docker-entrypoint-initdb.d
COPY procedures /docker-entrypoint-initdb.d

EXPOSE 5432