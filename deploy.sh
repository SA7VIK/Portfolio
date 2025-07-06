#!/bin/bash

# Production Deployment Script for sa7vik.in
set -e

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
if [ -z "$GROQ_API_KEY" ]; then
    print_error "GROQ_API_KEY environment variable is not set!"
    exit 1
fi

# Build frontend
print_status "Building frontend..."
cd portfolio-website
npm ci
npm run build
cd ..

# Build backend
print_status "Building backend..."
cd backend
# Ensure data directory exists
mkdir -p app/data
cd ..

# Build Docker images
print_status "Building Docker images..."
docker-compose build

# Test the build locally
print_status "Testing build locally..."
docker-compose up -d

# Wait for services to be healthy
print_status "Waiting for services to be healthy..."
sleep 30

# Test health endpoints
print_status "Testing health endpoints..."

# Test backend health
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    print_status "Backend health check passed"
else
    print_error "Backend health check failed"
    docker-compose logs backend
    exit 1
fi

# Test frontend health
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    print_status "Frontend health check passed"
else
    print_error "Frontend health check failed"
    docker-compose logs frontend
    exit 1
fi

print_status "✅ Local deployment test successful!"

# Stop local containers
print_status "Stopping local containers..."
docker-compose down

print_status "🎉 Deployment build completed successfully!"
print_status "Next steps:"
print_status "1. Push your code to your repository"
print_status "2. Deploy to your hosting provider (Vercel, Netlify, etc.)"
print_status "3. Set up your domain DNS to point to your hosting provider"
print_status "4. Configure your API domain (api.sa7vik.in) to point to your backend server" 