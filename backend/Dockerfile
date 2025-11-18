# Use a lightweight Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to leverage Docker's build cache
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy rest of the application code to working directory inside the container
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application or start the server
CMD [ "npm", "start" ]


