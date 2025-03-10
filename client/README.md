# WhatsApp GPT Bot (client side)

Welcome to the Vite-powered React.js frontend repository of WhatsApp GPT Bot. This project serves as the frontend of the WhatsApp GPT Bot application, providing an interactive UI for users.

### Environment files

Before running the application ensure that you have the environment files `.env.development` and `.env.production` set up in the root directory of your project. These files are crucial for configuring different API base URLs for development and production environments.

### Example Configuration:

- Development (.env.development):

```conf
VITE_API_BASE_URL=http://localhost:3001
```

- Production (.env.production):

```conf
VITE_API_BASE_URL=https://your-production-url.com
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

### Running the Application

After the installation, start the development server:

```cmd
npm run dev
```

### Building for Production

To create a production build, run:

```cmd
npm run build
```
