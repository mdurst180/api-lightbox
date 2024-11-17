#!/bin/bash

# Run Drizzle migrations
echo "Running Drizzle migrations..."
npx drizzle-kit migrate --config src/drizzle.config.ts || { echo "Migration failed"; exit 1; }

# Start the application
echo "Starting the app..."
exec npm run start
