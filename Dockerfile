# Base Image
FROM node:16.13

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available
COPY package*.json ./

# If you have a package-lock.json, use npm ci for faster installations
RUN npm ci

# Bundle app source
COPY . .

# Build TypeScript (assuming you have a build script in your package.json)
RUN npm run build

# Expose the port your app runs on
EXPOSE 9002

# Command to run your app
ENTRYPOINT ["npm", "start"]
