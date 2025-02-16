## **What is Middleware?**
In the context of **Node.js and Express.js**, **middleware** is a function that sits between the **request** (incoming from the client) and the **response** (sent by the server). It can execute some code before or after the request is processed.

---

#### **How Middleware Works?**
middleware is like a **series of checkpoints** that an HTTP request passes through before reaching its final destination.

🔹 a client sends a request → Middleware **intercepts & processes** the request → The request **moves forward** to the next function or response is sent back.

#### **Example: Basic Express Middleware**
```javascript
const express = require("express");
const app = express();

// Custom Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Passes control to the next middleware/route handler
};

app.use(logger); // Applying middleware to all routes

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```
📝 **How it works:**
1. Every request (GET, POST, etc.) goes through the `logger` middleware.
2. The middleware logs the request method (`GET`, `POST`) and URL.
3. `next()` passes control to the next function (in this case, the route handler).

---

#### **Types of Middleware in Express.js**
i tried to categorize middlewares based on their purpose:

| **Type**          | **Description** | **Example** |
|------------------|--------------|------------|
| **Application-level** | Applied globally to all routes | `app.use(logger)` |
| **Router-level** | Used only for specific routes | `router.use(authMiddleware)` |
| **Built-in** | Provided by Express.js | `express.json()`, `express.urlencoded()` |
| **Error-handling** | Handles errors in the app | `app.use((err, req, res, next) => {...})` |
| **Third-party** | External middleware for added features | `cors()`, `helmet()`, `morgan()` |

---

#### **Common Middleware Examples**
##### **1. Built-in Middleware**
Express provides some built-in middleware for handling common tasks:

✅ **`express.json()`** – Parses JSON data from incoming requests.
```javascript
app.use(express.json()); // Allows reading JSON request body
```

✅ **`express.urlencoded({ extended: true })`** – Parses URL-encoded data (e.g., form submissions).
```javascript
app.use(express.urlencoded({ extended: true }));
```

##### **2. Third-Party Middleware**

✅ **`cors`** – Allows cross-origin requests (important for APIs).
```javascript
const cors = require("cors");
app.use(cors());
```

##### **3. Error-Handling Middleware**
Error-handling middleware catches errors and prevents crashes.
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
```
This function is called whenever an error is thrown in the app.

---

### **Middleware in this Subscription Tracker API**
Since we're making a **secure API**, we'll need middleware for:

✅ **Logging requests** (for debugging)           
✅ **Parsing JSON request bodies** (`express.json()`)  
✅ **CORS handling** (for cross-origin API access)  
✅ **Authentication & authorization** (JWT, OAuth, etc.)  
✅ **Error handling** (graceful handling of failures)  


