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
MONGO_URI=''
```

### Database Related Stuff

The `match` property in the `email` field of Mongoose User schema (`user.model.js`) is used to validate that the email string follows a specific pattern using a **regular expression (regex)**.  

### Breakdown of the Regular Expression:  
```js
/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
```

#### Explanation:
1. **`^`** – Start of the string.  
2. **`[\w-\.]+`** – Matches one or more (`+`) of the following:
   - `\w` → Any alphanumeric character (letters, numbers, underscore `_`).
   - `-` → Hyphen (`-`).
   - `.` → Dot (`.`).  
   This ensures that the username part of the email (before `@`) contains valid characters.  
3. **`@`** – Ensures there is exactly one `@` symbol.  
4. **`([\w-]+\.)+`** – Matches one or more occurrences (`+`) of:
   - `[\w-]+` → A word (letters, numbers, or hyphen).  
   - `\.` → A dot (`.`).  
   This ensures that the domain part (like `gmail.` or `yahoo.`) is present.  
5. **`[\w-]{2,4}$`** – Matches the top-level domain (TLD) part:
   - `[\w-]` → Letters, numbers, or hyphen.
   - `{2,4}` → Length between **2 to 4** characters (e.g., `com`, `net`, `org`).  
6. **`$`** – End of the string.  

### What does this regex do?
It ensures that the email follows a standard format like:
- ✅ `user@example.com`
- ✅ `john_doe-123@gmail.co`
- ❌ `user@.com` (Missing domain name)
- ❌ `user@example` (Missing top-level domain)
- ❌ `user@@example.com` (Multiple `@` symbols)

If the email does **not** match the pattern, Mongoose will throw an error:  
`"Please provide a valid email"`.

---
### Why i chose mongoose for the database?

So mongoose is an ODM Which means an Object-Document-Mapper. Since mongoDB is NoSQL db and does not use relation db.

- because i wanted a good schema enforcement(since mongodb is schema less but mongoose lets use define strich schemas)
- i needed built-in validation
- easy relationships & populating data (mongoose has such features)
- our project has mostly CRUD operations.
- and i am comfortable with OOP rather than complex raw SQL queries.
- and because we can use middleware functions to do some stuff before or after certain events like save, find, etc.

> i know this is going to be slower than native driver and requires additional learning curve but i think it is worth it.

---


> [!NOTE]
> This section contains more detailed information about the project's functionality.

<details>
  <summary>What Is?</summary>

#### Middleware Functions
[Middleware](/docs/what-is/middleware.md) functions are used to handle common tasks like logging, parsing requests, and error handling.

#### CORS
[CORS](/docs/what-is/cors.md) (Cross-Origin Resource Sharing) is a security feature that controls how web pages can request resources from different domains.

</details>