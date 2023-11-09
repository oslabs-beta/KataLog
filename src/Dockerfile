# Use the node image as base image
FROM node:16.13 AS build

# Set the working directory
WORKDIR /usr/

# Copy package*.json files to the working directory
COPY package*.json ./
COPY webpack.config.js ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the 'src' directory contents into the container at /usr/src
COPY ./src/ ./

# Build the application
ENV DOCKER_BUILD=true
RUN npm run build

# Use nginx:alpine as the base image for the final stage
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/dist /usr/share/nginx/html

# Copy the nginx configuration
COPY ./src/nginx/default.conf /etc/nginx/conf.d/default.conf
