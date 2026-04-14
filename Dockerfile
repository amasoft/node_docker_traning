# Use Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy rest of the code
COPY . .

# Build TypeScript
RUN yarn build

# Expose port
EXPOSE 5000

# Run app
CMD ["node", "dist/server.js"]