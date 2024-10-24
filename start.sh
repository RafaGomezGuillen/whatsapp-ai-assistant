#!/bin/bash

export GROQ_API_KEY=GROQ_API_KEY
export BING_COOKIE=BING_COOKIE_HERE

while true; do
    node --no-deprecation index.js

    STATUS=$?
    
    if [ $STATUS -ne 0 ]; then
        echo "Node.js process exited with status $STATUS. Restarting ..."
        sleep 1
    fi
done
