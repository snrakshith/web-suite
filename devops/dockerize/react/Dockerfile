# Stage 1: Build the React App
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the entire project directory into the working directory
COPY . .

# Build the React app for production
RUN npm run build


# Stage 2: Serve the React App
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy build artifacts from the previous stage
COPY --from=build /app/build ./build

# Install serve to run the React app
RUN npm install -g serve

# Expose port 3000 (default port for React apps)
EXPOSE 3000

# Command to run the React app using serve
CMD ["serve", "-s", "build"]

# Exposed .env for the app
ENV API=https:api.dev.ikurelive.com