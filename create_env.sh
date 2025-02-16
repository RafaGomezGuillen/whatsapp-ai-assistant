#!/bin/bash

# Create .env files from server folder
SERVER_ENV_PATH="./server/.env"

cat > "$SERVER_ENV_PATH" <<EOL
GROQ_API_KEY="INTRODUCE GROQ API KEY"
UNSPLASH_ACCESS_KEY="INTRODUCE UNSPLASH ACCESS KEY"
EOL
echo "$SERVER_ENV_PATH file created successfully."

# Create .env files from client folder
CLIENT_DEV_ENV_PATH="./client/.env.development"

cat > "$CLIENT_DEV_ENV_PATH" <<EOL
VITE_API_BASE_URL=http://localhost:3001
EOL
echo "$CLIENT_DEV_ENV_PATH file created successfully."

CLIENT_PROD_ENV_PATH="./client/.env.production"

cat > "$CLIENT_PROD_ENV_PATH" <<EOL
VITE_API_BASE_URL=https://your-production-url.com
EOL
echo "$CLIENT_PROD_ENV_PATH file created successfully."
