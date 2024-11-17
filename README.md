# api-ightbox
Lightbox API users

express
swagger
drizzle
postgres
docker

fly.io
Step 1: Install the Fly.io CLI
If you haven’t already, install the Fly.io CLI by following the installation instructions from the Fly.io documentation:

Install Fly.io CLI
Step 2: Log in to Fly.io
Log in to your Fly.io account using the following command:

fly auth login
Step 3: Create a New Fly.io App
If you haven’t already created your Fly.io app, create a new one with the following command:

fly launch
Choose a name for your app.
Select your region (choose one closest to your users for performance reasons).
Step 4: Create a Fly.io PostgreSQL Database
Fly.io makes it easy to set up a PostgreSQL database with their managed database service. Run the following command to create the database:

fly postgres create
This will:

Provision a PostgreSQL instance on Fly.io.
Output connection information (such as the database URL) that you can use to connect to the database from your app.
You will see a connection string that looks like this:

postgres://username:password@hostname:port/database_name
Step 5: Set Up the Database Connection in Your App
Add the Database URL as an Environment Variable: After creating the PostgreSQL database, Fly.io provides you with the connection string. You need to set it as an environment variable so your app can access the database securely.
Run the following command to set the DATABASE_URL environment variable in your app:

fly secrets set DATABASE_URL=postgres://username:password@hostname:port/database_name
Replace postgres://username:password@hostname:port/database_name with the actual connection string you received from the fly postgres create command.

fly deploy

 docker-compose up --build