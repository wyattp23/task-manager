# Task Manager

Task manager app implemented with Next.js and FastAPI

## Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

## Getting Started

1. Clone the repository:

2. Create a `.env` file in the project /frontend and /backend with the values found in the respective `.env.tpl` files to run the services locally.

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

### CI/CD Pipeline

- GitHub Actions for:
  - Automated testing
  - Code quality checks
  - Security scanning
  - Docker image building
- Automated deployments to staging/production
- Deployment smoke tests

### Monitoring & Observability

- Error tracking with Sentry
- Health checks and metrics collection
- Performance monitoring

### Infrastructure

- Production infrastructure setup (AWS/GCP/Azure)
  - Container orchestration (Kubernetes/ECS)
  - Load balancing
  - Database scaling and backups
- Caching strategy (Redis)

### Performance Optimization

- Frontend
  - Implement React Query for efficient data fetching/caching
- Backend
  - Optimize database queries and indexes
  - Set up connection pooling
