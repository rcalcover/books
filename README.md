# Books (Spotto Code Challenge)

## Prerequisites

- Node.js (v22 or higher)
- PostgreSQL (v15 or higher)
- Docker & Docker Compose

## Quick Start

To run the application using Docker:

```bash
docker compose up
```

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Run database migrations:
```bash
npm run migrate
```

3. Seed the database with initial data:
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

> **Important**: When running the application in development mode for the first time, make sure to run migrations and seeders before starting the server.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| API_PORT | Server port number | 9000 |
| DATABASE_URL | PostgreSQL connection string | postgresql://postgres:postgres@localhost:5432/books |
| NODE_ENV | Environment mode | development |

Example `.env` file:
```env
API_PORT=9000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/books
NODE_ENV=development
```

## API Documentation

### Books Endpoints

#### Get All Books
```bash
curl -X GET http://localhost:9000/api/books
```

#### Get Book by ID
```bash
curl -X GET http://localhost:9000/api/books/:id
```

#### Create Book
```bash
curl -X POST http://localhost:9000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10T00:00:00.000Z",
    "genre": "Fiction"
  }'
```

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | Yes | Book title |
| author | string | Yes | Book author |
| publishedDate | Date | Yes | Date of publication |
| genre | string | Yes | 'Fiction' or 'Non-Fiction' |

#### Update Book
```bash
curl -X PUT http://localhost:9000/api/books/:id \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "author": "Updated Author",
    "publishedDate": "1925-04-10T00:00:00.000Z",
    "genre": "Non-Fiction"
  }'
```

#### Delete Book
```bash
curl -X DELETE http://localhost:9000/api/books/:id
```
