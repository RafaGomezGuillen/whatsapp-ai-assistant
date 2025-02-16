# WhatsApp GPT Bot (server side)

The WhatsApp GPT Bot server allows customization through an admin panel. Access the admin panel at:

```cmd
http://localhost:<your_port> # normally is 3001
```

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en) installed on your machine. You can check if Node.js is installed by running the following command in your terminal:

```cmd
node -v
```

### Installation

npm install

```cmd
npm i
```

### Installation troubleshooting

To ensure proper installation, make sure you have the latest Visual C++ Build Tools installed. You can refer to the Node.js [node-gyp documentation](https://github.com/nodejs/node-gyp) for detailed instructions on installing the required tools.

## Running the Application

After configuring the keys, you can start the application with the following commands:

1. Make the `start.sh` script executable:

```bash
chmod +x start.sh
```

2. Run the `start.sh` script:

```bash
./start.sh
sh start.sh # on windows
```

## Cleaning the Application

You can clean temporary files, cache, and other unnecessary content using the `clean.sh` script.

> [!CAUTION]
> Running `cleans.sh` will delete all authentication-related files. You will need to re-authenticate after running the script.

### Usage

1. Ensure Execution Permissions: Before running the script, ensure it has the necessary permissions. Run the following command to make the script executable:

```bash
chmod +x clean.sh
```

2. Execute the Script: Run the script from the terminal:

```bash
./clean.sh
sh clean.sh # on windows
```
