# Backend for Inventory Management

## Tech Stack

-   <b>Server</b>: Node.js
-   <b>Database</b>: MongoDB
-   <b>Routing</b>: Express
-   ORM: Mongoose
-   JWT for authorization
-   express-validator to validate the input using middlewares

## Setup Instructions

1. Download and install Node.js and make sure it is added to PATH
2. Download Mongodb client called Compass, which allows us to interact with the database
3. Paste the MONGODB_URI in the connection url of mongodb client
4. Run the following commands
5. `npm install`
6. `npm run dev`

## Routes

### Auth

1. POST `/register`
2. POST `/login`

### Product

1. GET `/products?sku=&page=`
2. GET `/products/:id`
3. POST `/products`
4. PUT `/products/:id`
5. DELETE `/products/:id`

### Orders

1. GET `/orders`
2. GET `/orders/:id`
3. POST `/orders`
