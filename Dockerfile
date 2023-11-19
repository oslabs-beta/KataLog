FROM node:18.15.0

WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm config set fetch-retry-maxtimeout 300000 # Increase max timeout to 5 minutes

RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000

# Run the web service on container startup.
CMD [ "npm", "run", "start-backend" ]
