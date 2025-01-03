# Task Manager

Task manager app implemented with Next.js and FastAPI

## Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

## Getting Started

1. Clone the repository:

2. Create a `.env` file in the project root with the values found in the `.env.tpl` file to run the services locally.

3. Build and start the services:

For development (with live reload):

```bash
docker compose up --build
```

For testing (only backend for now, additional testing recommended in next steps):

```bash
docker compose -f docker-compose.test.yml up --build
```

4. The services will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:5432

## Basic Usage

On the sign-in page, You can create an account with any email and password and access the task manager.

Create tasks with the create task button, edit them by clicking on the fields you'd like to edit after the task is created.

Change the status or delete the task with the button on the right of the task.

# Reccomended Next Steps

### Authentication & Security

- Replace local auth with Auth provider (Auth0, Clerk, etc..)
- Set up proper session management

### Testing

- Backend:
  - Integration tests for all endpoints
  - Load testing
- Frontend:
  - Unit tests with Jest/React Testing Library
  - E2E tests with Cypress/Playwright

### Infrastructure

- Production infrastructure setup (AWS/GCP/Azure)
  - Container orchestration (Kubernetes/ECS)
  - Load balancing
  - Database scaling and backups
- Database migrations setup
  - Implement Alembic for SQL migrations
  - Version control for schema changes
  - Automated migration runs in CI/CD
- Environment variables management
  - Secrets management service (AWS Secrets Manager/HashiCorp Vault)
  - Environment-specific configurations

### CI/CD Pipeline

- GitHub Actions for:
  - Automated testing
  - Code quality checks
  - Security scanning
  - Docker image building
- Automated deployments to staging/production
- Deployment smoke tests

### Performance Optimization

- Frontend
  - Implement React Query for efficient data fetching/caching
- Backend
  - Optimize database queries and indexes
  - - Caching strategy (Redis)
  - Set up connection pooling

### Monitoring & Observability

- Error tracking with Sentry
- Health checks and metrics collection
- Performance monitoring
