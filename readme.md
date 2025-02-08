# NestJS Template

A production-ready NestJS template with TypeScript, Yarn, Nodemon, and Swagger documentation support.

## Features

- 🚀 **NestJS 10.x** - Latest stable version
- 📝 **TypeScript** - Type checking and better developer experience
- 🔄 **Hot Reload** - Using Nodemon and SWC for faster development
- 📚 **Swagger UI** - API documentation out of the box
- 🔑 **JWT Support** - Built-in JWT authentication
- ⏰ **Task Scheduling** - Using @nestjs/schedule
- 🎯 **REST API** - Built on Express
- 🧪 **Testing** - Jest setup for unit and e2e tests
- ✨ **Prettier & ESLint** - Code formatting and linting
- 🔄 **HTTP Client** - Axios for HTTP requests

## Prerequisites

- Node.js (>= 16.x)
- Yarn package manager

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/nestjs-template.git

# Enter the project directory
cd nestjs-template

# Install dependencies
yarn install

# Start development server with hot reload
yarn start:dev
```

## Available Scripts

- `yarn build` - Build the application
- `yarn start` - Start the application
- `yarn start:dev` - Start the application in watch mode with hot reload
- `yarn start:debug` - Start the application in debug mode
- `yarn start:prod` - Start the production build
- `yarn lint` - Lint the code
- `yarn format` - Format the code

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## Project Structure

```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root application module
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

## Features Included

- **@nestjs/swagger** - API documentation
- **@nestjs/config** - Environment configuration
- **@nestjs/jwt** - JWT authentication
- **@nestjs/schedule** - Task scheduling
- **bcrypt** - Password hashing
- **axios** - HTTP client

## Testing

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## License

This project is [UNLICENSED](LICENSE).