# Use an official Node runtime as a parent image
FROM node:18.15.0

# Set the working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# Copy the built directories
COPY dist/ dist/
COPY public/ public/

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "dist/server.js"]
