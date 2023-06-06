# Project node-express-mongoDB-CRUD

## Description
It provides an API for managing items using an Express.js server with a MongoDB database. Users can perform CRUD (Create, Read, Update, Delete) operations on items through the provided API endpoints.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Install the dependencies: `npm install`

## Usage

1. Start the server: `node app.js`
2. Access the API endpoints at `http://localhost:3000/api/items`

## API Endpoints

- `GET /api/items` - Retrieve all items.
- `GET /api/items/:id` - Retrieve a specific item by ID.
- `POST /api/items` - Create a new item.
- `PUT /api/items/:id` - Update an existing item.
- `DELETE /api/items/:id` - Delete an item.

### Request Body Format

The request bodies for creating and updating items should be in JSON format and contain the following properties:

{
  "name": "Item Name"
}
