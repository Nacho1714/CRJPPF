DROP TYPE IF EXISTS "document_options";
CREATE TYPE "document_options" AS ENUM (
    'DNI',
    'LE',
    'LC',
    'PAS'
);

-----------------------------------------------------------------------------------------------
-- USER
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "user" CASCADE;
CREATE TABLE "user" (
    "user_id"               INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"                  VARCHAR(100)        NOT NULL,
    "last_name"             VARCHAR(100)        NOT NULL,
    "profile"               CHAR(8)      UNIQUE NOT NULL,
    "password"              VARCHAR(255)        NOT NULL,
    "last_login"            TIMESTAMP,           
    "is_active"             BOOLEAN             NOT NULL    DEFAULT TRUE,
    "created_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP

    CHECK ("name" ~ '^[A-Za-zÁÉÍÓÚáéíóúÜüñÑ\s''.´]+$')
    CHECK ("last_name" ~ '^[A-Za-zÁÉÍÓÚáéíóúÜüñÑ\s''.´]+$')
);

-----------------------------------------------------------------------------------------------
-- SESSION FAILED
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "session_failed" CASCADE;
CREATE TABLE "session_failed" (
    "session_failed_id"     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_name"             CHAR(4)        NOT NULL,
    "created_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP
);

-----------------------------------------------------------------------------------------------
-- DIRECTORATE
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "directorate" CASCADE;
CREATE TABLE "directorate" (
    "directorate_id"        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"                  VARCHAR(40) UNIQUE  NOT NULL,
    "is_active"             BOOLEAN             NOT NULL    DEFAULT TRUE,
    "created_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP

    CHECK ("name" ~ '^[A-Za-znÑ ]+$')
);

-----------------------------------------------------------------------------------------------
-- SECTOR
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "sector" CASCADE;
CREATE TABLE "sector" (
    "sector_id"             INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"                  VARCHAR(40) UNIQUE  NOT NULL,
    "is_active"             BOOLEAN             NOT NULL    DEFAULT TRUE,
    "created_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP

    CHECK ("name" ~ '^[A-Za-znÑ ]+$')
);

-----------------------------------------------------------------------------------------------
-- DIRECTORATE HAS SECTOR
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "directorate_has_sector" CASCADE;
CREATE TABLE "directorate_has_sector" (
    "destination_id"        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "directorate_fk"        INTEGER             NOT NULL    REFERENCES "directorate"(directorate_id),
    "sector_fk"             INTEGER             NOT NULL    REFERENCES "sector"(sector_id),
    "name"                  VARCHAR(80) UNIQUE,
    "level"                 CHAR(1),
    "created_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,

    CHECK ("name" ~ '^[A-Za-znÑ -]+$'),
    CHECK ("level" ~ '^[0-9]+$')
);

DROP INDEX IF EXISTS unique_directorate_sector;
CREATE UNIQUE INDEX unique_directorate_sector ON "directorate_has_sector" (
    "directorate_fk",
    "sector_fk"
);

-----------------------------------------------------------------------------------------------
-- POSITION
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "position" CASCADE;
CREATE TABLE "position" (
    "position_id"           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"                  VARCHAR(70)  UNIQUE NOT NULL,
    "is_active"             BOOLEAN             NOT NULL    DEFAULT TRUE,
    "created_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP

    CHECK ("name" ~ '^[A-Za-z\s''ñÑ. ]+$')
);

-----------------------------------------------------------------------------------------------
-- EMPLOYEE
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "employee" CASCADE;
CREATE TABLE "employee" (
    "employee_id"           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "position_fk"           INTEGER             REFERENCES "position"(position_id),
    "destination_fk"        INTEGER             REFERENCES "directorate_has_sector"(destination_id),
    "name"                  VARCHAR(100)        NOT NULL,
    "last_name"             VARCHAR(100)        NOT NULL,
    "is_active"             BOOLEAN             NOT NULL    DEFAULT TRUE,
    "created_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"            TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP

    CHECK ("name" ~ '^[A-Za-zÁÉÍÓÚáéíóúÜüñÑ\s''.´]+$')
    CHECK ("last_name" ~ '^[A-Za-zÁÉÍÓÚáéíóúÜüñÑ\s''.´]+$')
);

----------------------------------------------------------------------------------------------
-- GOVERNMENT INSTITUTIONS
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "government_institutions" CASCADE;
CREATE TABLE "government_institutions" (
    "government_institutions_id"    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"                          VARCHAR(100)        NOT NULL,
    "created_at"                    TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"                    TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP

);

----------------------------------------------------------------------------------------------
-- INSTITUTIONAL DEPARTMENTS
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "institutional_departments" CASCADE;
CREATE TABLE "institutional_departments" (
    "institutional_departments_id"  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"                          VARCHAR(100)        NOT NULL,
    "government_institutions_fk"    INTEGER             NOT NULL    REFERENCES "government_institutions"(government_institutions_id),
    "created_at"                    TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"                    TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP

);

-----------------------------------------------------------------------------------------------
-- VISITOR
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "visitor" CASCADE;
CREATE TABLE "visitor" (
    "visitor_id"                    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_fk"                       INTEGER             NOT NULL    REFERENCES "user"(user_id),
    "employee_fk"                   INTEGER             NOT NULL    REFERENCES "employee"(employee_id),
    "destination_fk"                INTEGER             NOT NULL    REFERENCES "directorate_has_sector"(destination_id),
    "institutional_departments_fk"  INTEGER                         REFERENCES "institutional_departments"(institutional_departments_id),
    "another_origin"                VARCHAR(100),
    "name"                          VARCHAR(100)        NOT NULL,
    "last_name"                     VARCHAR(100)        NOT NULL,
    "document_type"                 document_options    NOT NULL,
    "document_number"               VARCHAR(20)         NOT NULL,
    "image"                         VARCHAR(50),
    "note"                          TEXT,    
    "entry"                         TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "exit"                          TIMESTAMP,               
    "created_at"                    TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    "updated_at"                    TIMESTAMP           NOT NULL    DEFAULT CURRENT_TIMESTAMP

    CHECK ("name" ~ '^[A-Za-z\s''ñÑ. ]+$')
    CHECK ("last_name" ~ '^[A-Za-z\s''ñÑ. ]+$')
    CHECK ("document_number" ~ '^[A-Za-znÑ0-9]+$')
);