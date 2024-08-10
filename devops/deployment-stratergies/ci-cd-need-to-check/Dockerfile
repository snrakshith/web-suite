# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port on which your app runs (replace 3000 with your app's port if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

# Set the build argument with a default value
# ARG APP_VERSION=1.0.0

# Set the app version as an environment variable
# ENV APP_VERSION=$APP_VERSION
