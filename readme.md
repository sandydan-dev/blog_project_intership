# BLOG BACKEND SYSTEM

- *COMPANY* : CODETECH IT SOLUTIONS
- *NAME* : Sandeep Dhanwate
- *INTERN ID* : CT06DA679
- *DOMAIN* : Backend Web Development
- *DURATION* : 6 WEEK
- *MENTOR* : NEELA SANTOSH


A full-featured blog platform built with Node.js, Express, and Sequelize ORM.

## Overview

This blog platform allows users to create accounts, publish blog posts, and engage with other users through comments. The application implements user authentication, role-based authorization, and relational data management.


## New user regiter
![Image](https://github.com/user-attachments/assets/26926dc4-fb1b-41e9-9c0b-b6cd63eb7924)

## Login existing user
![Image](https://github.com/user-attachments/assets/f3cace18-ccb9-450c-8b74-68f46e9bc308)

## Features

- **User Management**
  - Registration and authentication
  - Role-based access control (user/admin roles)
  - Profile management

- **Blog Posts**
  - Create, read, update, and delete blog posts
  - Rich text content
  - Author attribution

- **Comments**
  - Comment on blog posts
  - Nested discussions
  - User attribution for comments

- **Data Relationships**
  - Users can create multiple blog posts
  - Users can comment on blog posts
  - Blog posts can have multiple comments

## Technical Stack

- **Backend**: Node.js with Express
- **Database**: SQL database (via Sequelize ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Data Modeling**: Sequelize models with associations

## Database Schema

### Users
- id (PK)
- username (unique)
- email (unique)
- password (hashed)
- role (user/admin)
- timestamps

### Blog Posts
- id (PK)
- title
- content
- userId (FK)
- timestamps

### Comments
- id (PK)
- content
- userId (FK)
- blogpostId (FK)
- timestamps

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- SQL database (PostgreSQL)

### Installation

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=blog_db
JWT_SECRET=your_jwt_secret
PORT=3000
```


## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token


### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Blog Posts
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get blog post by ID
- `POST /api/posts` - Create a new blog post
- `PUT /api/posts/:id` - Update blog post
- `DELETE /api/posts/:id` - Delete blog post

### Comments
- `GET /api/posts/:postId/comments` - Get all comments for a post
- `POST /api/posts/:postId/comments` - Add a comment to a post
- `PUT /api/comments/:id` - Update a comment
- `DELETE /api/comments/:id` - Delete a comment

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by modern blogging platforms and community engagement tools
