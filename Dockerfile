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


# FROM node:22-alpine
FROM node:22-bullseye

WORKDIR /app

# Install Chromium + dependencies
RUN apt-get update && apt-get install -y \
  chromium \
  ca-certificates \
  fonts-liberation \
  libnss3 \
  libxss1 \
  libasound2 \
  libgtk-3-0 \
  libx11-xcb1 \
  libgbm1 \
  libxshmfence1 \
  && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["node", "dist/server.js"]