# Full-Stack MitevGPT

A full-stack application featuring MitevGPT, combining advanced AI capabilities with a modern tech stack.

## Features

- **AI-Powered Chatbot**: Integrated with Gemini's GPT models.
- **Full-Stack Architecture**: Includes both frontend and backend.
- **Modern UI/UX**: Built with React.
- **Backend API**: Powered by Node.js and Express.js.
- **Database**: MongoDB for storing user data and interactions.

## Technologies

- **Frontend**: React, React-query, React-router-dom, Clerk, Imagekit, React-markdown, React-type-animation
- **Backend**: Node.js, Express.js, Cors, Dotenv, Imagekit, Mongoose, Nodemon
- **Database**: MongoDB
- **AI Integration**: Gemini API

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/DimitarMitev92/full-stack-mitevGPT.git
   cd full-stack-mitevGPT
   ```
2. Install dependencies for Front-end:
   ```bash
   cd client
   npm i -f
   ```
3. Set up environment variables:
- Create a .env file in the root client directory
- Add require keys and configurations:
  ```js
  #Clerk
  VITE_CLERK_PUBLISHABLE_KEY=
  # ImageKit.io
  VITE_IMAGE_KIT_ENDPOINT=
  VITE_IMAGE_KIT_PUBLIC_KEY=
  # Google Generative AI
  VITE_GEMINI_PUBLIC_KEY=
  VITE_API_URL=http://localhost:3000
  ```
4. Start the development server:
  ```bash
  npm run dev
  ```
5. Access the app at http://localhost:5173
6. Go to full-stack-mitevGPT directory:
   ```bash
   cd ..
   ```
7. Install dependancies for Back-end:
   ```bash
   cd backend
   npm i
   ```
8. Set up environment variables:
- Create a .env file in the root backend directory
- Add require keys and configurations:
  ```js
  PORT=3000
  # ImageKit.io
  IMAGE_KIT_ENDPOINT=
  IMAGE_KIT_PUBLIC_KEY=
  IMAGE_KIT_PRIVATE_KEY=
  CLIENT_URL=http://localhost:5173
  # MongoDB connection url
  MONGO=
  # Clerk
  CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=
  ```
9. Start the development server:
    ```bash
    npm start
    ```
