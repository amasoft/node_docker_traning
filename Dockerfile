# # Use Node image
# FROM node:22-alpine

# # Set working directory
# WORKDIR /app

# # Copy package files
# COPY package.json yarn.lock ./

# # Install dependencies
# RUN yarn install

# # Copy rest of the code
# COPY . .

# # Build TypeScript
# RUN yarn build

# # Expose port
# EXPOSE 5000

# # Run app
# # CMD ["node", "dist/server.js"]
# CMD ["yarn", "start"]


FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

# CMD ["yarn", "start"]
CMD ["node", "dist/server.js"]