# Makefile for Elastic Search NestJS Project
# Author: Suraj Singh Deo

.PHONY: help install build start dev test clean docker-up docker-down docker-logs lint format

# Default target
help:
	@echo "Available commands:"
	@echo "  install     - Install dependencies"
	@echo "  build       - Build the project"
	@echo "  start       - Start the application in production mode"
	@echo "  dev         - Start the application in development mode"
	@echo "  test        - Run tests"
	@echo "  test:watch  - Run tests in watch mode"
	@echo "  test:cov    - Run tests with coverage"
	@echo "  clean       - Clean build artifacts"
	@echo "  docker-up   - Start Elasticsearch with Docker"
	@echo "  docker-down - Stop Elasticsearch Docker containers"
	@echo "  docker-logs - Show Docker container logs"
	@echo "  lint        - Run ESLint"
	@echo "  format      - Format code with Prettier"
	@echo "  setup       - Complete setup (install + docker-up)"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Build the project
build:
	@echo "Building the project..."
	npm run build

# Start in production mode
start:
	@echo "Starting the application in production mode..."
	npm run start:prod

# Start in development mode
dev:
	@echo "Starting the application in development mode..."
	npm run start:dev

# Run tests
test:
	@echo "Running tests..."
	npm run test

# Run tests in watch mode
test:watch:
	@echo "Running tests in watch mode..."
	npm run test -- --watch

# Run tests with coverage
test:cov:
	@echo "Running tests with coverage..."
	npm run test:cov

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist/
	rm -rf node_modules/
	rm -rf coverage/

# Start Elasticsearch with Docker
docker-up:
	@echo "Starting Elasticsearch with Docker..."
	cd docker/elasticsearch && docker-compose up -d

# Stop Elasticsearch Docker containers
docker-down:
	@echo "Stopping Elasticsearch Docker containers..."
	cd docker/elasticsearch && docker-compose down

# Show Docker container logs
docker-logs:
	@echo "Showing Docker container logs..."
	cd docker/elasticsearch && docker-compose logs -f

# Run ESLint
lint:
	@echo "Running ESLint..."
	npm run lint

# Format code with Prettier
format:
	@echo "Formatting code with Prettier..."
	npm run format

# Complete setup (install + docker-up)
setup: install docker-up
	@echo "Setup complete! You can now run 'make dev' to start the application."

# Create indices
create-indices:
	@echo "Creating Elasticsearch indices..."
	@echo "Creating product index..."
	curl -X POST http://localhost:3000/product/create/index
	@echo "Creating seller index..."
	curl -X POST http://localhost:3000/seller/create/index
	@echo "Creating location index..."
	curl -X POST http://localhost:3000/location/create/index

# Sample data insertion
insert-sample-data:
	@echo "Inserting sample data..."
	@echo "Inserting sample seller..."
	curl -X POST http://localhost:3000/seller/insert/seller \
		-H "Content-Type: application/json" \
		-d '{"name":"John Doe","age":30,"email":"john@example.com","phone":1234567890,"rating":4.5,"location":{"lat":40.7,"lon":-74.0}}'
	@echo "Inserting sample product..."
	curl -X POST http://localhost:3000/product/insert/product \
		-H "Content-Type: application/json" \
		-d '{"name":"Laptop","type":"Electronics","rating":4.5,"price":1200,"sellerId":"seller123","location":{"lat":40.7128,"lon":-74.0060}}'

# Health check
health:
	@echo "Checking application health..."
	curl -X GET http://localhost:3000/health || echo "Application not running"

# Full development workflow
dev-workflow: docker-up dev
	@echo "Development environment ready!"

# Production deployment
deploy: build
	@echo "Deploying to production..."
	# Add your deployment commands here
	@echo "Deployment complete!"

# Database backup (if needed)
backup:
	@echo "Creating database backup..."
	# Add backup commands here
	@echo "Backup complete!"

# Database restore (if needed)
restore:
	@echo "Restoring database..."
	# Add restore commands here
	@echo "Restore complete!"

# Show project status
status:
	@echo "=== Project Status ==="
	@echo "Node modules: $(shell if [ -d "node_modules" ]; then echo "Installed"; else echo "Not installed"; fi)"
	@echo "Docker containers: $(shell docker ps --filter "name=elasticsearch" --format "table {{.Names}}\t{{.Status}}" 2>/dev/null || echo "Docker not running")"
	@echo "Application: $(shell curl -s http://localhost:3000/health >/dev/null && echo "Running" || echo "Not running")"
	@echo "Elasticsearch: $(shell curl -s http://localhost:9200 >/dev/null && echo "Running" || echo "Not running")" 