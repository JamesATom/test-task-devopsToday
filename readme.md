# Country Holidays Calendar API

This project provides an API to view country information and add national holidays to a user's calendar.

## Features

- Get a list of available countries
- Get detailed information about a specific country (borders, population, flag)
- Add national holidays of a specific country to a user's calendar
- Manage user calendar events

## Prerequisites

- Node.js (v16+)
- Yarn
- Docker
- Docker Compose

## Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables by creating a `.env` file in the root directory:

```
PORT=3000

DATE_NAGER_API_AVAILABLE_COUNTRIES=https://date.nager.at/api/v3/AvailableCountries
DATA_NAGER_API_COUNTRY_INFO=https://date.nager.at/api/v3/CountryInfo
DATE_NAGER_API_PUBLIC_HOLIDAYS=https://date.nager.at/api/v3/PublicHolidays

DATA_NAGER_API_COUNTRY_POPULATION=https://countriesnow.space/api/v0.1/countries/population
DATA_NAGER_API_COUNTRY_IMAGE=https://countriesnow.space/api/v0.1/countries/flag/images

MONGODB_URI=mongodb://localhost:27017/calendar_db
```

## Running the Application

### Start MongoDB using Docker

```bash
docker-compose up -d
```

This will start a MongoDB container on port 27017.

### Seed the Database

Populate the database with initial test users:

```bash
chmod +x start.sh  # Make the script executable (if needed)
./start.sh
```

### Start the Application

```bash
yarn start:dev
```

This will start the NestJS application in development mode with hot-reload enabled.

## API Endpoints

### Countries

- `GET /v1/countries` - Get list of available countries
- `GET /v1/countries/:countryCode` - Get detailed information about a specific country

### Users

- `GET /v1/users` - Get all users
- `POST /v1/users/:userId/calendar/holidays` - Add national holidays to user's calendar

#### Example Request Body for Adding Holidays

```json
{
    "countryCode": "US",
    "year": 2025,
    "holidays": ["New Year's Day", "Independence Day"]
}
```

If the `holidays` array is empty or not provided, all holidays for that country and year will be added.

## Testing

### Test Users

After running the seed script, you'll get two test users with IDs printed in the console:

- John Doe (john.doe@example.com)
- Jane Smith (jane.smith@example.com)

You can use these IDs to test the calendar endpoints.

### API Testing

You can use tools like Postman or curl to test the API endpoints.

Example curl command to add holidays to a user's calendar:

```bash
curl -X POST \
  http://localhost:3000/v1/users/[USER_ID]/calendar/holidays \
  -H 'Content-Type: application/json' \
  -d '{
    "countryCode": "US",
    "year": 2025,
    "holidays": ["New Year'\''s Day", "Independence Day"]
}'
```

## Project Structure

```
src/
├── app.module.ts            # Main application module
├── main.ts                  # Application entry point
├── common/                  # Common utilities, filters, guards, etc.
├── config/                  # Configuration settings
├── modules/
│   └── v1/
│       ├── countries/       # Countries module
│       │   ├── countries.controller.ts
│       │   ├── countries.module.ts
│       │   ├── countries.service.ts
│       │   └── dto/
│       └── users/           # Users module
│           ├── users.controller.ts
│           ├── users.module.ts
│           ├── users.service.ts
│           ├── dto/
│           ├── repository/  # Database repositories
│           └── schema/      # Database schemas
└── scripts/
    └── seed.js              # Database seeding script
```

## Documentation

### Swagger Documentation

Access the Swagger API documentation at:

```
http://localhost:3000/api
```

### Environment Variables

- `PORT` - Port number for the application (default: 3000)
- `MONGODB_URI` - MongoDB connection URI
- `DATE_NAGER_API_*` - API endpoints for date.nager.at services
- `DATA_NAGER_API_*` - API endpoints for countriesnow.space services

## Development

### Architecture

The application follows a clean architecture approach:

1. **Controller Layer**: Handles HTTP requests and responses
2. **Service Layer**: Contains business logic
3. **Repository Layer**: Manages database operations
4. **Schema Layer**: Defines database schemas

### Adding New Features

To add a new feature:

1. Create appropriate DTOs in the `dto` folder
2. Add database schemas if needed
3. Implement repository methods for database operations
4. Add business logic in service classes
5. Create controller endpoints
6. Update module definitions

## Troubleshooting

### MongoDB Connection Issues

If you encounter MongoDB connection issues:

1. Ensure Docker is running: `docker ps`
2. Check MongoDB container status: `docker logs test-task-mongodb`
3. Verify your connection string in `.env`: `MONGODB_URI=mongodb://localhost:27017/calendar_db`
4. Restart MongoDB: `docker-compose down -v && docker-compose up -d`

### API Call Failures

If external API calls fail:

1. Check your internet connection
2. Verify API endpoints in `.env` file
3. Check API documentation for any changes or rate limits

## License

This project is licensed under the MIT License.

## Contributors

- Abdulaziz Abdukhakimov

## Acknowledgments

- [Date Nager API](https://date.nager.at) for holiday data
- [Countries Now API](https://countriesnow.space) for country information
