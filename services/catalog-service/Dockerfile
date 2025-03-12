# Use an official Node.js image
FROM node:16-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application source code
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
