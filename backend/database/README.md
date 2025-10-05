# JSON Database System

This directory contains a file-based JSON database system that replaces the in-memory arrays with persistent JSON files.

## Structure

- `data/` - Directory containing JSON data files
  - `users.json` - User data
  - `chatRooms.json` - Chat room data
  - `messages.json` - Message data

## Database Operations

Each database module (`users.ts`, `chatRooms.ts`, `messages.ts`) provides the following operations:

### Users

- `getAllUsers()` - Get all users
- `getUserById(id)` - Get user by ID
- `createUser(user)` - Create new user
- `updateUser(id, updates)` - Update user
- `deleteUser(id)` - Delete user

### Chat Rooms

- `getAllChatRooms()` - Get all chat rooms
- `getChatRoomById(id)` - Get chat room by ID
- `createChatRoom(room)` - Create new chat room
- `updateChatRoom(id, updates)` - Update chat room
- `deleteChatRoom(id)` - Delete chat room

### Messages

- `getAllMessages()` - Get all messages
- `getMessagesByChatRoomId(chatRoomId)` - Get messages for a chat room
- `getMessageById(id)` - Get message by ID
- `createMessage(message)` - Create new message
- `updateMessage(id, updates)` - Update message
- `deleteMessage(id)` - Delete message
- `deleteMessagesByChatRoomId(chatRoomId)` - Delete all messages in a chat room

## Features

- **Persistent Storage**: All data is automatically saved to JSON files
- **Error Handling**: Graceful error handling for file operations
- **Type Safety**: Full TypeScript support with proper typing
- **Automatic ID Generation**: Uses timestamp-based IDs for new records
- **Date Handling**: Proper serialization/deserialization of Date objects

## Usage

The database functions are automatically imported and used by the route handlers. No changes are needed in the application logic - the API remains the same while providing persistent storage.
