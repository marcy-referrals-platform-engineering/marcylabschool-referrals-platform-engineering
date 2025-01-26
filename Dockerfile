# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install OpenSSL (latest available version in Alpine)
RUN apk add --no-cache openssl

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build the application
COPY . .
RUN npx prisma generate  # Generate Prisma Client for OpenSSL 3.3.x
RUN npm run build

# Production Stage
FROM node:18-alpine
WORKDIR /app

# Install OpenSSL in the runtime environment
RUN apk add --no-cache openssl

# Copy built app from builder stage
COPY --from=builder /app ./

# Expose port and run the app
EXPOSE 3000
CMD ["npm", "start"]
