# Use official Node.js LTS version as the base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:18-alpine 

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start"]
