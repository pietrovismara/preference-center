# Preference Center API

## Installation

```bash
$ yarn
```

## Running the app

Create a `.env` file in the project root using the following format:

```
SERVER_PORT = 8000
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_USERNAME = didomi
TYPEORM_PASSWORD = password
TYPEORM_DATABASE = didomi
TYPEORM_PORT = 5432
TYPEORM_ENTITIES = src/**/*.entity.ts
TYPEORM_MIGRATIONS = src/migrations/*.ts
TYPEORM_MIGRATIONS_DIR = src/migrations
```

The variables in the file will also be used to setup the docker-compose environment.

### To launch the app:

```bash
# With docker-compose
$ docker-compose up

# Without docker-compose
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Migrations

```bash
# generate a migration
$ yarn typeorm migration:generate -n <MigrationName>

# run new migrations
$ yarn typeorm migration:run

# revert the last migration
$ yarn typeorm migration:revert
```

## Documentation

After launching the app in development mode (`NODE_ENV !== 'production'`) you can visit the OpenAPI documentation at `localhost:<SERVER_PORT>/openapi`
