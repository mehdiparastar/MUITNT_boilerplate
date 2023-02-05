#!/bin/bash

docker compose -f docker-compose.dev.yml down

echo "\n\nstarting app..."

sleep 2

docker compose -f docker-compose.dev.yml up --build -d

sleep 2

docker image prune -f
docker container prune -f
docker volume prune -f
docker system prune -f

echo "\n\napp started."