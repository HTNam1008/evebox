# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng (nếu sử dụng TypeScript)
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Install chỉ production dependencies
RUN npm install --production

# Copy ứng dụng đã build từ stage trước
COPY --from=builder /app/dist ./dist

# Expose port backend sử dụng
EXPOSE 3001

# Define lệnh để chạy ứng dụng
CMD ["npm", "run", "start:prod"]
