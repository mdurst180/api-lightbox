#!/bin/bash

# Run Drizzle migrations
echo "Running Drizzle migrations..."
npx npm run db:push || { echo "Migration failed"; exit 1; }

# Start the application
echo "Starting the app..."
exec npm run start
