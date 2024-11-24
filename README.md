# task-manager

Task manager app implemented with Next.js and FastAPI

## Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

## Getting Started

1. Clone the repository:

2. Create a `.env` file in the project root with the following variables:

3. Build and start the services:

For development (with live reload):

```bash
docker compose up --build
```

For testing:

```bash
docker compose -f docker-compose.test.yml up --build
```

4. The services will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:5432

## Running Tests

To run the backend tests:

## Development

The project uses Docker volumes for development, so your local changes will be reflected in the containers. The services will automatically reload when you make changes to the code.

## Project Structure

- `/frontend` - Next.js frontend application
- `/backend` - FastAPI backend application
- `docker-compose.yml` - Main Docker Compose configuration
- `docker-compose.test.yml` - Test environment configuration
