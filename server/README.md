# WhatsApp AI Assistant (Server Side)

The server side of the WhatsApp AI Assistant project is responsible for handling the backend logic, API integrations, and data processing required to generate intelligent responses for WhatsApp users. It is built using Node.js and includes various modules for configuration, controllers, models, routes, and utility functions. The server communicates with external APIs and services to fetch data, process it, and send appropriate responses back to the client side of the application.

## Project Structure

```
server/
  ├── .env
  ├── .gitignore
  ├── package.json
  ├── README.md
  ├── start.sh
  ├── clean.sh
  ├── src/
  │   ├── index.js
  │   ├── config/
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   └── utils/
```

## Environment Files

Before running the application, ensure that you have the environment files `.env` set up in the root directory of your project. These files are crucial for configuring different API integrations that your WhatsApp AI Assistant needs to generate responses.

> [!TIP]
> The `create_env.sh` file will create the env file you need to execute the application in both **Client** and **Server** side projects.

### Example Configuration

- Environment file (`.env`):

```conf
GROQ_API_KEY="INTRODUCE GROQ API KEY"
UNSPLASH_ACCESS_KEY="INTRODUCE UNSPLASH ACCESS KEY"
```

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en) installed on your machine. You can check if Node.js is installed by running the following command in your terminal:

```sh
node -v
```

### Installation

Install the project dependencies by running:

```sh
npm install
```

### Installation Troubleshooting

To ensure proper installation, make sure you have the latest Visual C++ Build Tools installed. You can refer to the Node.js [node-gyp documentation](https://github.com/nodejs/node-gyp) for detailed instructions on installing the required tools.


## Running the Application

After configuring the keys, you can start the application with the following commands:

1. Make the `start.sh` script executable:

```sh
chmod +x start.sh
```

2. Run the `start.sh` script:

```sh
./start.sh
```

For Windows:

```cmd
sh start.sh
```

## Cleaning the Application

You can clean temporary files, cache, and other unnecessary content using the `clean.sh` script.

> [!CAUTION]
> Running `clean.sh` will delete all authentication-related files. You will need to re-authenticate after running the script.

### Usage

1. Ensure Execution Permissions: Before running the script, ensure it has the necessary permissions. Run the following command to make the script executable:

```sh
chmod +x clean.sh
```

2. Execute the Script: Run the script from the terminal:

```sh
./clean.sh
```

For Windows:

```cmd
sh clean.sh
```
