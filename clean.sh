#!/bin/bash

#  Folders to clean
folders=(
    ".wwebjs_auth/"
    ".wwebjs_cache/"
    "audio/"
    "images/"
    "logger/logs/"
)

for folder in "${folders[@]}"; do
    if [ -d "$folder" ]; then
        rm -rf "$folder"/*
        echo "[INFO] Contents of $folder removed."
    else
        echo "[ERROR] Folder $folder does not exist."
    fi
done