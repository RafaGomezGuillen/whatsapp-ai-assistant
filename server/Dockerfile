# Use Ubuntu as the base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Install required system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    jq \ 
    bash
     
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Modify config.json to use the correct path for Chromium
RUN jq '.chrome_path = "/usr/bin/chromium-browser"' /app/server/config.json > /app/server/config.tmp.json \
    && mv /app/server/config.tmp.json /app/server/config.json

# Give execution permission to start.sh
RUN chmod +x /app/start.sh

# Expose the backend port
EXPOSE 3001

# Ensure we use /bin/sh to execute start.sh
CMD ["/bin/sh", "/app/start.sh"]