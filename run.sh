#!/bin/bash

# Move to the directory containing the docker-compose.yml file
cd .devcontainer

# Stop and remove containers
echo "Stopping and removing containers..."
docker-compose down

# Rebuild and start containers in detached mode
echo "Rebuilding and starting containers..."
docker-compose up --build -d

# Stream real-time logs
echo "Streaming real-time logs..."
docker-compose logs -f
