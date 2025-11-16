# WebSocket Chat Application

A real-time chat application built with Next.js, Express, and Socket.io, featuring AI-powered message generation.

## Tech Stack

### Frontend

- **Next.js 15** with React 19
- **Chakra UI v3** for UI components
- **Socket.io Client** for real-time communication
- **TypeScript**

### Backend

- **Express.js** REST API server
- **Socket.io** for WebSocket connections
- **File-based JSON database**
- **OpenAI API** (via OpenRouter) for AI message generation
- **TypeScript**

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- OpenRouter API key (for AI features) - you can generate one at [https://openrouter.ai/](https://openrouter.ai/)

## Installation

### Backend

```bash
cd backend
npm install
# or
yarn install
```

### Frontend

```bash
cd frontend
npm install
# or
yarn install
```

## Environment Variables

### Backend

Create a `.env.local` file in the `backend/` directory:

```env
PORT=3010
CLIENT_1_PORT=3000
CLIENT_2_PORT=3001
CLIENT_3_PORT=3002
OPEN_ROUTER_AI_LLM_API_KEY=your_open_router_ai_api_key_here
```

> **Note:** You can generate an API key at [https://openrouter.ai/](https://openrouter.ai/)

## Running the Application

### Development Mode

1. **Start the backend server:**

   ```bash
   cd backend
   npm start
   # or
   yarn start
   ```

2. **Start the frontend (choose one port):**

   ```bash
   cd frontend
   npm run dev:3000  # Port 3000
   # or
   npm run dev:3001  # Port 3001
   # or
   npm run dev:3002  # Port 3002
   ```

### Testing Multi-User Scenarios

You can run multiple frontend instances simultaneously in separate terminals to test real-time communication and AI features:

**Terminal 1:**

```bash
cd frontend
npm run dev:3000
```

**Terminal 2:**

```bash
cd frontend
npm run dev:3001
```

**Terminal 3 (optional):**

```bash
cd frontend
npm run dev:3002
```

This allows you to:

- Test real-time messaging between multiple users
- Verify WebSocket connections work correctly
- Test AI features with different users in the same chat room
- Simulate multi-user chat scenarios

### Production Mode

> **Important:** Start the backend server first, as Next.js will make API calls during the build process for page prerendering.

1. **Start the backend:**

   ```bash
   cd backend
   npm start
   # or
   yarn start
   ```

2. **Build the frontend:**

   ```bash
   cd frontend
   npm run build
   # or
   yarn build
   ```

3. **Start the frontend (choose one port):**
   ```bash
   cd frontend
   npm run start:3000  # Port 3000
   # or
   npm run start:3001  # Port 3001
   # or
   npm run start:3002  # Port 3002
   ```

## Features

- **Real-time messaging** via WebSocket connections
- **Multiple chat rooms** support
- **User management** with user selection
- **AI-powered responses** using OpenAI API
- **Full AI Mode** for automatic message generation
- **Multi-client support** - run multiple frontend instances simultaneously

## Project Structure

```
.
├── backend/
│   ├── database/          # File-based JSON database
│   ├── routes/            # Express API routes
│   ├── types/             # TypeScript types
│   ├── server.ts          # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   ├── providers/     # Context providers
│   │   ├── services/      # API service layer
│   │   └── types/         # TypeScript types
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /users` - Get all users
- `GET /chat-rooms` - Get all chat rooms
- `GET /chat-rooms/:id/messages` - Get messages for a chat room
- `POST /ai/generate-response` - Generate AI response

## Socket Events

- `watch` - Join a chat room
- `unwatch` - Leave a chat room
- `message:new` - Send/receive new messages
