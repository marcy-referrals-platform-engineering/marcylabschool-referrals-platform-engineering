# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install OpenSSL 
RUN apk add --no-cache openssl

# Define build-time arguments
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Set environment variables inside the build container
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL"
RUN echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY"
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
