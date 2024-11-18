
# Lightbox API

## Description

This project is a RESTful CRUD API for managing users and posts. The API is built in Typescript running on **Express**. The database is Postgres and the application uses **Drizzle ORM** as its ORM. **Joi** is used to validate inputs. **Jest** is used for the tests. **Swagger** is used for documentation.

The application can run locally in a Docker container following the steps below. The application is also deployed to fly.io at https://api-lightbox.fly.dev.

## Setup

### 1. Clone the Repo
```bash
git clone https://github.com/mdurst180/api-lightbox
cd api-lightbox
```
### 2. Run Tests
The tests include integration and unit tests. The integration tests use PGLite as an in-memory postgres lite db.

To run the tests:
```bash
npm run test
```

## Running Locally

With **Docker** installed, follow these steps to run locally:

### 1. Build & Run in Docker
```bash
docker-compose up --build
```

This will start both the application and the Postgres database. The application will be available on [http://localhost:3000](http://localhost:3000).

### 2. View the Swagger API Docs
Once running, the Swagger docs can be accessed here.
```
http://localhost:3000/api-docs
```

### 3. Run Curl Commands
Below are some curl commands to use against the local instance.

Get all users
```
curl -X GET http://localhost:3000/api/users
```
Create a new user
```
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john.doe@example.com"}'
```
Get user by userId
```
curl -X GET http://localhost:3000/api/users/{{userId}}
```

Add a post to a user
```
curl -X POST http://localhost:3000/api/posts \
-H "Content-Type: application/json" \
-d '{"title": "Sample Post Title", "content": "This is the content of the sample post.", "user_id": {{userId}}}'
```

Update an existing user
```
curl -X PUT http://localhost:3000/api/users/{{userId}} \
-H "Content-Type: application/json" \
-d '{"name": "Jane Doe", "email": "jane.doe@example.com"}'
```

Delete a user
```
curl -X DELETE http://localhost:3000/api/users/{{userId}}
```

## Fly.io
The application is also deployed at fly.io. The deployment uses the fly cli and can be deployed with the command:
```
fly deploy
```

You can view the docs here:
https://api-lightbox.fly.dev/api-docs/

As an example, you can get all users here:
https://api-lightbox.fly.dev/api/users


## Next Steps
- Add authentication to the API
- Get migrations working properly

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
