# Task Management Application Documentation

## Overview

Welcome to the documentation for the Task Management Application backend API. This API allows users to manage tasks efficiently. It is built using React, Node.js, Express.js, and MySQL (MERN stack) as the backend stack.


## Base URL
The base URL for all API endpoints is: `https://localhost:3000/`

## Authentication
To access protected routes, users need to register and log in. Authentication is done via JWT token-based authorization.


## Technical Stack

- **Frontend:**
  - Tailwind
  - ChaKra-UI
  - React
  - Html-CSS

- **Backend:**
  - Node.js
  - Express
  - MySQL
  - Sequelize



## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
3. Navigate to the project directory:
   ```
   cd Task_Management-

   ```
5. Install dependencies:
   - Backend:
   ```
    cd Backend
    npm install
   ````
   - Frontend:
   ```
    cd Frontend
     npm install
   ```
6. Start the backend server:
   ```
   cd Backend
   npm run server
   ```
 5.Start the Frontend server:
   ```
   cd Frontend
   npm run dev
   ```
## API Endpoints

### Register
- **Method:** POST
- **Endpoint:** `/user/register`
- **Description:** Allows users to register. Hashes the password on store.
- **Request Body:**
  ```json
  {
    "name": "Aishwarya",
    "email": "aishwarya@example.com",
    "password": "1234"
   }

 ### Login
- **Method:** POST
- **Endpoint:** `/user/login`
- **Description:** Allows users to login. Hashes the password on store.
- **Request Body:**
  ```json
  {
    "email": "aishwarya@example.com",
    "password": "1234"
  }

 ### Logout
- **Method:** GET
- **Endpoint:** `/user/logout`
- **Description:** User Logged out. token push in blacklist[]
- **Request Body:**
  ```json
  {
  "token":"saddfsfhgafcggggh"
  }

### Get All Tasks of Logged in User
- **Method:** GET
- **Endpoint:** `/task`
- **Description:** Return only logged in user's tasks list array .
- **Request Body:**
  ```json
  {
  "title": "Task1",
  "description": "Abcd"
  }

### Get Task by ID
- **Method:** GET
- **Endpoint:** `/task/:id`
- **Description:** Returns the details of a specific task identified by its ID.

- **Request Body:**
  - **Response:** `task Object`
 
### Add New Task
- **Method:** POST
- **Endpoint:** `/task`
- **Description:** Allows user to add new task 
- **Request Body:**
  ```json
  {
    "title": "Task Title",
  "description": "Task Content",
  }

 ### Update Task by ID
- **Method:** PUT
- **Endpoint:** `/task/:id`
- **Description:** Allows user to update the details of a specific task identified by its ID. 
- **Request Body:**
  - **Response:** `Updated Array of task object`

 ### Delete Task by ID
- **Method:** DELETE
- **Endpoint:** `/task/:id`
- **Description:** Allows user to delete the details of a specific task identified by its ID. 
- **Request Body:**
  - **Response:** `Delete Task Object`

## Error Handling

The API handles errors gracefully and returns appropriate HTTP status codes and error messages.

## Authentication and Authorization

Authentication is required for accessing certain endpoints. Unauthorized access will result in a 401 status code.




