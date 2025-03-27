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
    ttf-freefont
     
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Give execution permission to start.sh
RUN chmod +x /app/start.sh

# Expose the backend port
EXPOSE 3001

# Ensure we use /bin/sh to execute start.sh
CMD ["/bin/sh", "/app/start.sh"]