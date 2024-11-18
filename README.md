
# Lightbox API

## Description

This project is a RESTful CRUD API for managing users and posts. The API is built using **Express**, **Drizzle ORM** and **Swagger** for API documentation.

## Components

- **User Management**: 
  - Create, retrieve, update, and delete users.
  
- **Post Management**:
  - Create, retrieve, update, and delete posts.

- **Database**: Uses **PostgreSQL** for data storage, with **Drizzle ORM** for database operations.

## Setup

### 1. Clone the Repo
```bash
git clone https://github.com/mdurst180/api-lightbox
cd api-lightbox
```
## Running Tests
The tests include integration and unit tests. The integration tests use PGLite as an in memory database to make better simulate the real application.

To run the tests:
```bash
npm run test
```

### 2. Run locally with Docker

Ensure you have **Docker** installed. Then, follow these steps to set up your environment using Docker:

- **Build & Run in Docker**:
```bash
docker-compose up --build
```

This will start both the application and the PostgreSQL database container. The application will be available on [http://localhost:3000](http://localhost:3000).

- **Swagger API Docs**:
The Swagger doc can be accessed here.
```
http://localhost:3000/api-docs
```

- **Example curl commands**:
Below are some curl commands to use the local instance.

Get all users
```
curl -X GET http://localhost:3000/api/users
```

- **Stopping the Application**:
```bash
docker-compose down
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
