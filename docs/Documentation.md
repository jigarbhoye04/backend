# Subscription Tracking API Documentation

## Project Architecture
The project follows a monolithic backend architecture with the following key components:

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB (planned)
- **Security**: Arcjet integration (planned)
- **Workflow Management**: Upstash (planned)
- **Hosting**: Hostinger VPS (planned)

## Project Structure

```bash
backend/
├── app.js                   # Main application entry point
├── config/
│   └── env.js               # Environment configuration
├── docs/
│   └── Documentation.md     # API documentation
├── routes/
│   ├── auth.routes.js       # Authentication route handlers
│   ├── user.routes.js       # User management route handlers
│   └── subscriptions.routes.js     # Subscription management route handlers
├── package.json             # Project dependencies and scripts
├── eslint.config.js         # ESLint configuration
├── .env.development.local   # Development environment variables
├── .env.production.local    # Production environment variables
└── .gitignore               # Git ignore rules
```

## API Endpoints

### Authentication Routes (`/api/v1/auth`)
- POST `/sign-up` - User registration
- POST `/sign-in` - User login
- POST `/sign-out` - User logout

### User Management (`/api/v1/users`)
- GET `/` - Retrieve all users
- GET `/:id` - Get user details by ID
- POST `/` - Create new user
- PUT `/:id` - Update user information
- DELETE `/:id` - Delete user

### Subscription Management (`/api/v1/subscriptions`)
- GET `/` - List all subscriptions
- GET `/:id` - Get subscription details
- POST `/` - Create new subscription
- PUT `/:id` - Update subscription
- DELETE `/:id` - Delete subscription
- GET `/user/:id` - Get user's subscriptions
- PUT `/:id/cancel` - Cancel subscription
- GET `/upcoming-renewals` - View upcoming renewal dates

![routes check](/docs/Screenshots/routes_demo.png)

## Environment Configuration
The project uses environment-specific configuration:

### Development
```env
PORT=5500
NODE_ENV='development'