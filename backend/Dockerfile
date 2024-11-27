# Use the official Node.js image as the base image
FROM node:20 AS builder

WORKDIR /app

# Copy all files
COPY . .

# Install the application dependencies
RUN npm install --silent

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]