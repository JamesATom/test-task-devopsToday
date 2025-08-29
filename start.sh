#!/bin/bash

# Start MongoDB container
echo "Starting MongoDB container..."
docker-compose up -d

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to initialize..."
sleep 5

# Seed the database
echo "Seeding the database..."
node src/scripts/seed.js

echo "Setup complete! Run 'yarn start:dev' to start the application."
# Uncomment the line below to automatically start the application
yarn start:dev
