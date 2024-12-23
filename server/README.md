# WhatsApp GPT Bot (server side)

The WhatsApp GPT Bot server allows customization through an admin panel. Access the admin panel at:

```cmd
http://localhost:<your_port> # normally is 3001
```

This provides real-time configuration options for your bot.

![Admin panel picture](assets/admin.png)

> [!NOTE]
> While you can configure the bot through the server, it is highly recommended to perform customizations in the client-side project, which includes comprehensive documentation and an easier user experience.

## Environment files

Before running the application, create an `.env` file in the same folder as the `start.sh` file with your API keys:

```env
# .env
GROQ_API_KEY="API_KEY"
BING_IMAGE_COOKIE="API_KEY"
```

1. **GROQ_API_KEY**: Replace this with your actual API key for the GROQ service.
2. **BING_IMAGE_COOKIE**: Replace this with the `_U` cookie value from Bing. To obtain the `_U` cookie:

- Open your browser (preferably Microsoft Edge).
- Go to [Bing](https://www.bing.com/) and sign in with your Microsoft account.
- Open Developer Tools (`F12` or `Ctrl + Shift + I`), and navigate to the "Application" or "Storage" tab.
- Under "Cookies," select `https://www.bing.com` and locate the `_U` cookie.
- Copy the `_U` cookie value and use it as your BING_IMAGE_COOKIE.

3. **chrome_path**: Specify the path to the Chrome executable on your system. Here’s how to find it:

- **On Windows**: The default path is usually:

```bash
C:\Program Files\Google\Chrome\Application\chrome.exe
```

If you are using a 32-bit version of Chrome on a 64-bit system, it may be:

```bash
C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
```

- **On macOS**: The path is typically:

```bash
/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

- **On Linux**: Common paths include:

```bash
/usr/bin/google-chrome
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
