# Kanban Backend API - Postman Collection

This directory contains a complete Postman collection for testing all APIs in the Kanban Backend project.

## Files Included

- `Kanban_Backend_APIs.postman_collection.json` - Complete API collection with all endpoints
- `Kanban_Backend_Development.postman_environment.json` - Environment variables for development

## Import Instructions

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Select `Kanban_Backend_APIs.postman_collection.json`
4. Click "Import"

### 2. Import Environment
1. In Postman, click on the gear icon (⚙️) in the top right
2. Click "Import"
3. Select `Kanban_Backend_Development.postman_environment.json`
4. Click "Import"
5. Select the "Kanban Backend - Development" environment from the dropdown

## API Endpoints Included

### Boards
- **GET** `/api/boards` - Get all boards
- **POST** `/api/boards` - Create a new board

### Lists
- **POST** `/api/lists/:boardId` - Create a list in a board
- **PUT** `/api/lists/:id` - Update list title
- **DELETE** `/api/lists/:id` - Delete a list

### Cards
- **POST** `/api/cards/:listId` - Create a card in a list
- **GET** `/api/cards/list/:listId` - Get all cards in a list
- **PUT** `/api/cards/:id` - Update a card
- **PUT** `/api/cards/:id/move/:newListId` - Move card between lists
- **DELETE** `/api/cards/:id` - Delete a card

## Usage Workflow

### Recommended Testing Order

1. **Create a Board** first using the "Create Board" request
2. **Create Lists** in the board using the "Create List" request
3. **Create Cards** in the lists using the "Create Card" request
4. **Test other operations** like updating, moving, and deleting

### Automatic Variable Management

The collection includes pre-request and test scripts that:
- Automatically store IDs from creation responses
- Set up environment variables for subsequent requests
- Include basic response validation tests

### Environment Variables

- `baseUrl` - Server base URL (default: http://localhost:5000)
- `boardId` - Automatically populated when creating boards
- `listId` - Automatically populated when creating lists
- `cardId` - Automatically populated when creating cards
- `newListId` - For moving cards between lists

## Sample Request Bodies

### Create Board
```json
{
  "title": "My Project Board",
  "description": "A board for managing project tasks"
}
```

### Create List
```json
{
  "title": "To Do",
  "position": 0
}
```

### Create Card
```json
{
  "title": "Implement user authentication",
  "description": "Add login and registration functionality",
  "position": 0
}
```

### Update Card
```json
{
  "title": "Updated card title",
  "description": "Updated card description"
}
```

### Move Card
```json
{
  "position": 1
}
```

## Environment Setup

Make sure your Kanban backend server is running on `http://localhost:5000` (or update the `baseUrl` variable accordingly).

To start the server:
```bash
npm run dev
```

## Testing Features

Each request includes:
- Response time validation (< 2000ms)
- Content-Type validation (JSON)
- Automatic ID extraction and storage
- Request logging for debugging

## Manual ID Management

If you need to manually set IDs:
1. Go to Environment settings (gear icon)
2. Edit the "Kanban Backend - Development" environment
3. Update the required ID variables manually

## Troubleshooting

1. **Connection errors**: Ensure the backend server is running
2. **404 errors**: Check that the base URL is correct
3. **Invalid IDs**: Make sure you've created the required parent resources (boards before lists, lists before cards)

## Notes

- All requests use JSON format
- IDs are automatically managed between requests
- The collection is designed for local development but can be adapted for other environments
- Rate limiting is implemented in the backend (100 requests per 15 minutes)