# Stage 1: Build
FROM node:18-alpine AS builder

# Install OpenSSL and other required dependencies
RUN apk add --no-cache openssl libc6-compat

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies including dev dependencies (for Prisma)
RUN npm install

# Copy Prisma schema and .env file
COPY src/infrastructure/database/prisma ./src/infrastructure/database/prisma

# Generate Prisma Client with the correct schema path
RUN npx prisma generate --schema=./src/infrastructure/database/prisma/schema.prisma

# Copy the entire source code to the container
COPY . .

# Copy the environment variables
# COPY .env ./.env

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Install OpenSSL in production image
RUN apk add --no-cache openssl libc6-compat

# Set working directory
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built application and Prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Expose port the backend uses
EXPOSE 3001

# Define the command to run the app
CMD ["npm", "run", "start:prod"]
