# WhatsApp AI Assistant (Client Side)

Welcome to the Vite-powered React.js frontend repository of WhatsApp AI Assistant. This project serves as the frontend of the WhatsApp AI Assistant application, providing an interactive UI for users.

## Environment Files

Before running the application, ensure that you have the environment files `.env.development` and `.env.production` set up in the root directory of your project. These files are crucial for configuring different API base URLs for development and production environments.

> [!TIP]
> The `create_env.sh` file will create the env files you need to execute the application in both **Client** and **Server** side projects.

### Example Configuration

- Development (`.env.development`):

```conf
VITE_API_BASE_URL=http://localhost:3001
```

- Production (`.env.production`):

```conf
VITE_API_BASE_URL=https://your-production-url.com
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

### Running the Application

After the installation, start the development server:

```sh
npm run dev
```

### Building for Production

To create a production build, run:

```sh
npm run build
```

## Project Structure

```
client/
  ├── .env.development
  ├── .env.production
  ├── .gitignore
  ├── eslint.config.js
  ├── index.html
  ├── package.json
  ├── README.md
  ├── vite.config.js
  ├── public/
  │   └── logo.png
  └── src/
      ├── App.jsx
      ├── index.css
      ├── main.jsx
      ├── Routes.jsx
      ├── api/
      ├── components/
      ├── layouts/
      ├── pages/
```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Lints the codebase using ESLint.
