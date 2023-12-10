# Mongoose Express CRUD Mastery

This is a server application built with Express.js, TypeScript, and Mongoose. It provides a robust starting point for developing a CRUD API.

## Features

- Express.js as the server framework.
- TypeScript as the main language.
- Mongoose for object modeling with MongoDB.
- bcrypt for password hashing.
- Zod for schema validation.
- CORS enabled.
- Environment variables using dotenv.
- Code formatting with Prettier.
- Linting with ESLint.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installing

1. Clone the repository

```bash
git clone https://github.com/webdmamun/Mongoose-Express-CRUD-Mastery.git
```

2. Install NPM packages

```bash
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

```
MONGODB_URI=your_mongodb_uri
```

### Running the server

For development:

```bash
npm run start:dev
```

For production:

```bash
npm run build
npm run start:prod
```

### Linting and Formatting

To check for linting errors:

```bash
npm run lint
```

To fix linting errors:

```bash
npm run lint:fix
```

To format your code:

```bash
npm run prettier
```

To fix formatting issues:

```bash
npm run prettier:fix
```
