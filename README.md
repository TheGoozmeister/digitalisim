# Mov'Heat Mov'Hit

Welcome to the Mov'Heat Mov'Hit project, a React application that allows you to discover movies using the TMDb API.

## Prerequisites

Before starting the app, ensure that you have Node.js and npm installed on your machine. If not, you can download them from nodejs.org.

## Installation 

Follow the steps below to set up the project on your local machine.


### 1. Install dependencies

Run the following command to install the necessary dependencies for the frontend:

```bash 
npm install  
```

### 2. Set up the environment

Create a .env file at the root of the project. In this file, you will need to define an environment variable REACT_APP_TMDB_JWT for authentication with the TMDb API. Copy the following line into your .env file:

```plaintext 
REACT_APP_TMDB_JWT=YOUR_TMDB_TOKEN
```

**Important**: The token provided in this example is private to the user who generated it. Therefore, each developer needs to create their own API token from TMDb and replace it in the .env file. Never share your API token publicly.


### 3. Set up the backend (Separate Repo)

The backend of the project is in a separate repository. To set it up, follow these steps:

- Fork the backend repository from https://github.com/TheGoozmeister/digitalisim_backend
- Clone your fork of the backend to your local machine
- Install the backend dependencies :

```bash 
npm install  
```

- Start the server using node:

```bash 
node server  
```

The backend will now be available at http://localhost:3001 

### 4. Start the React App

Go back to the frontend directory and run the following command to start the React app in development mode:

```bash 
npm start  
```

The app will be available at http://localhost:3000

### 5. Log in to the application

When you open the app in your browser, you'll be prompted to log in. Use the following credentials to log in:

    Nom d'utilisateur: admin
    Mot de passe: admin

