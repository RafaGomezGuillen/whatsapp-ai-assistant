#!/bin/bash

# Source the .env file
source "$(dirname "$0")/.env"

export GROQ_API_KEY
export BING_COOKIE

while true; do
    node --no-deprecation index.js

    STATUS=$?
    
    if [ $STATUS -ne 0 ]; then
        echo "Node.js process exited with status $STATUS. Restarting ..."
        sleep 1
    fi
done
