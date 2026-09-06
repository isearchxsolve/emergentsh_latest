# Emergent.sh Clone

## Prerequisites

- Node.js >=20.0.0
- (Optional) Docker Desktop (if you wish to run with containers)

## Getting Started without Docker

1. Clone the repository.
2. Install dependencies:
        npm install
3. Start the development server:
        npm run dev
   This will start the frontend on http://localhost:3000 and any services that have a dev script.

4. To build for production:
        npm run build
   Then to start the frontend in production:
        cd frontend
        npm start

## Using Docker (if you wish to containerize)

Note: The project does not currently include Dockerfiles. You will need to create them.

However, if you encounter the Docker error as in `docker_error.txt`, it indicates a problem with the Docker daemon.

Steps to resolve the Docker daemon issue:

  1. Ensure Docker Desktop is running.
  2. If on Windows, try restarting Docker Desktop.
  3. Check for updates to Docker Desktop.
  4. If the problem persists, try resetting Docker Desktop (from the tray icon -> Settings -> General -> Reset).

Once Docker is working, you can create Dockerfiles for the frontend and each service.

Example Dockerfile for the frontend (place in `frontend/Dockerfile`):

  FROM node:20-alpine
  WORKDIR /app
  COPY package.json package-lock.json ./
  RUN npm ci
  COPY . .
  RUN npm run build
  EXPOSE 3000
  CMD ["npm", "start"]

Then, you can build and run:

  docker build -t emergent-frontend ./frontend
  docker run -p 3000:3000 emergent-frontend

Similarly, create Dockerfiles for the services and use docker-compose to orchestrate.

## Troubleshooting

If you see the error from `docker_error.txt`, it is not a problem with the project code but with your Docker environment.

