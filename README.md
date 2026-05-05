# To-Do App Backend Setup

## Overview

This is a minimal Spring Boot GraphQL backend with PostgreSQL database for a to-do application.

## Prerequisites

- Docker and Docker Compose installed

## Quick Start

### Option 1: Run with Docker Compose (Recommended)

```bash
docker-compose up --build
```

This will start:

- PostgreSQL database on `localhost:5432`
- Spring Boot backend on `localhost:8081`

### Option 2: Run Locally

1. Start PostgreSQL (using Docker):

```bash
docker run --name todoapp-db -e POSTGRES_DB=todoapp -e POSTGRES_USER=todouser -e POSTGRES_PASSWORD=todopass -p 5432:5432 postgres:16-alpine
```

2. Build and run the app:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## GraphQL Endpoint

- GraphQL API: `http://localhost:8081/graphql`
- GraphiQL UI: `http://localhost:8081/graphiql`

## Database Credentials

- Host: `localhost` (or `postgres` inside Docker)
- Port: `5432`
- Database: `todoapp`
- Username: `todouser`
- Password: `todopass`

## API Examples

### Query all todos

```graphql
query {
  todos {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

### Create a todo

```graphql
mutation {
  createTodo(title: "My First Todo", description: "Do something amazing") {
    id
    title
    completed
  }
}
```

### Update a todo

```graphql
mutation {
  updateTodo(id: 1, completed: true) {
    id
    completed
  }
}
```

### Delete a todo

```graphql
mutation {
  deleteTodo(id: 1)
}
```

## Project Structure

```
backend/
├── src/main/java/com/todoapp/
│   ├── TodoApplication.java (main entry point)
│   ├── controller/TodoGraphQLController.java (GraphQL resolvers)
│   ├── entity/Todo.java (JPA entity)
│   └── repository/TodoRepository.java (data access)
├── src/main/resources/
│   ├── application.properties (Spring config)
│   ├── graphql/schema.graphqls (GraphQL schema)
│   └── db/init.sql (database init script)
├── pom.xml (Maven dependencies)
└── Dockerfile (container image)
```

## Database Schema

The `todos` table has:

- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR, required)
- `description` (TEXT, optional)
- `completed` (BOOLEAN, default false)
- `created_at` (TIMESTAMP, auto-set)
- `updated_at` (TIMESTAMP, auto-updated)

## Stopping the Services

```bash
docker-compose down
```

To also remove the database volume:

```bash
docker-compose down -v
```
