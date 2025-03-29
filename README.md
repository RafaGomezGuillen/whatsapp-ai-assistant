# WhatsApp AI Assistant

Welcome to the WhatsApp AI Assistant project! This bot integrates GPT functionality with WhatsApp, allowing for various features such as text-to-speech, image generation, and more.

## 🎥 Watch the YouTube video to see the bot in action!

[![Watch the video](https://img.youtube.com/vi/tkHRkxfhbps/0.jpg)](https://www.youtube.com/watch?v=tkHRkxfhbps)

## Key Features

- **AI-Powered Chat**: Leverages state-of-the-art GPT models for engaging, intelligent responses.
- **Image Generation**: Use creative commands to generate stunning images directly within chats.
- **Voice Interaction**: Convert text to speech and interact with the bot in a more dynamic way.
- **Customizable Configuration**: Tailor the bot’s personality, error messages, and behavior to suit your preferences.
- **Create Commands**: Customize commands to enhance user interaction with general, image, and audio responses.

![Landing page](./assets/landing.png)

## Services

Explore a range of services designed to streamline your bot's setup and operation:

- **Main Configuration**: Set up your bot's core features, including its name, commands, main prompt (personality), as well as error and fallback responses to ensure a reliable bot performance with your WhatsApp account.
  ![Main confifuration](./assets/main_configuration.png)
- **Configuration Settings**: Easily configure your external API key integrations and other settings in just a few clicks to set up your application as fast as possible.
  ![Configuration settings](./assets/configurations.png)
- **Testing Environment**: Test your bot's responses in a controlled environment to ensure it's working as expected before deploying it to your WhatsApp account.
  ![Testing environment](./assets/testing_environment.png)
- **Comprehensive Documentation**: Access detailed documentation to guide you through every step of setting up, customizing, and troubleshooting your bot.
  ![Documentation](./assets/documentation_configuration.png)
- **Log and Message Retriever**: Review all server logs, filtering by info, debug, and error levels, and access your latest received WhatsApp messages.
  ![Logs](./assets/logs.png)

## Environment Setup

Before **running** or **deploying** with docker the application, ensure that you have the environment files set up in the root directories of both the client and server projects. The `create_env.sh` script will create the necessary environment files for you.

### `create_env.sh` Script

The `create_env.sh` script creates the required `.env` files for both the client and server projects. It generates the following files:

- Server: `server/.env`
- Client (Development): `client/.env.development`
- Client (Production): `client/.env.production`

To run the script, use the following command:

```sh
chmod +x create_env.sh
./create_env.sh
```

## Deployment Guide

### Prerequisites

Before deploying the project using Docker, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/)

### Step 1: Build and Run Docker Containers

> [!WARNING]
> Failure to execute this step before running Docker will result in missing environment configurations! So go and execute `create_env.sh` script to avoid problems.

Once the environment files are generated, you can proceed with building and running the Docker containers.

#### Using docker-compose

Run the following command to build and start the containers:

```cmd
docker-compose up --build -d
```

#### Stopping the Containers

To stop the containers, use:
```cmd
docker-compose down
```

#### Docker Compose Configuration

Below is an overview of the `docker-compose.yml` file:

```yml
services:
  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    restart: always

  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always
```

### Notes

- The backend runs on port **3001**.
- The frontend is exposed on port **80**.

## Contributing

If you'd like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a named feature branch (like `add_component_x`).
3. Write your change.
4. Submit a Pull Request using GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/RafaGomezGuillen/whatsapp-ai-assistant/blob/main/LICENCE) file for details.
