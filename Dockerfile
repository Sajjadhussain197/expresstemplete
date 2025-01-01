# Stage 1: Build Stage
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm cache clean --force && npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app .

# Install PM2 globally
RUN npm install -g pm2 && \
    chown -R node:node /app

# Switch to the 'node' user
USER node

# Expose the port the app runs on
EXPOSE 8080

# Start the app with PM2
CMD ["pm2-runtime", "dist/server.js"]
