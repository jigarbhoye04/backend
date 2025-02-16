
   ## **What is CORS (Cross-Origin Resource Sharing)?**
   CORS (**Cross-Origin Resource Sharing**) is a **security feature** implemented by web browsers that controls how web pages can request resources (like APIs, images, or fonts) from a **different domain** than the one the page was loaded from.

   By default, browsers **block cross-origin requests** for security reasons. CORS allows servers to specify **who (which domains) can access their resources and how**.

   ---

   ### **Why Does CORS Exist?**
   CORS exists to prevent a type of security risk called **Cross-Site Request Forgery (CSRF)**. Without CORS, any malicious website could **send requests to another website (e.g., our API)** using your logged-in credentials.

   For example:
   - If a user is logged into **bank.com**, a malicious site (**evil.com**) could try to send a request to **bank.com/api/transfer-money** using the user's session.
   - The browser blocks this request **unless CORS allows it**.

   ---

   ### **How CORS Works**
   When a browser makes a request to a different **origin** (domain, protocol, or port), the server must **explicitly allow** or **deny** the request.

   #### **Example of a Blocked Request**
   Imagine a frontend app (`frontend.com`) trying to request data from `backend.com`:
   ```javascript
   fetch("https://backend.com/api/data")
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.error("CORS error:", error));
   ```
   🚫 If **CORS is not enabled** on `backend.com`, the browser blocks the request with this error:
   ```
   Access to fetch at 'https://backend.com/api/data' from origin 'https://frontend.com' has been blocked by CORS policy.
   ```

   ---

   ### **Enabling CORS in Express.js**
   In our **Subscription Tracker API**, we’ll need to **allow frontend apps** to access our API.


   #### **CORS Middleware**
   ```javascript
   const express = require("express");
   const cors = require("cors");
   const app = express();

   app.use(cors()); // Enable CORS for all requests

   app.get("/data", (req, res) => {
      res.json({ message: "CORS is working!" });
   });

   app.listen(3000, () => console.log("Server running on port 3000"));
   ```

   ---

   ### **Customizing CORS**
   So if we do not wish to allow from **all origins** (`*`) we can specify **allowed domains**, **methods**, and **headers**.
 

   #### **Example: Restrict CORS to a Specific Domain**
   ```javascript
   app.use(cors({
      origin: "https://myfrontend.com", // Only allow requests from this domain
      methods: ["GET", "POST"], // Allow only specific HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
   }));
   ```

   ---

   ### **CORS Preflight Requests**
   Some requests trigger a **preflight request** before the actual request is sent. This happens when:
   - The request **uses methods like PUT, DELETE, PATCH**.
   - The request **has custom headers**.
   - The request **sends JSON data (`Content-Type: application/json`)**.

   The **browser first sends an `OPTIONS` request** to check if the server allows the request.

   #### **Handling Preflight Requests in Express**
   ```javascript
   app.options("*", cors()); // Allow preflight requests for all routes
   ```

   ---

   ### **When Do we Need CORS?**
   ✅ If  **frontend is hosted on a different domain** than backend API  
   ✅ If **building a public API** that other websites/apps might use  
   ✅ If API is being accessed by a **mobile app** (which counts as a different origin)  

   🚫 **We DON'T need CORS if:**
   - Our **frontend and backend are on the same origin** (same domain, protocol, and port).
   - Our backend is **only consumed by a server-side app** (e.g., a backend-to-backend API call).

   ---

   ### **Final Thoughts**
   CORS is **essential** for modern web APIs, especially when working with a frontend that runs on a different domain.  

   Since our **Subscription Tracker API** will likely be used by a separate frontend, we should configure **CORS properly** to avoid issues.

   as we might also implement **JWT (JSON Web Tokens)** for **authentication**, we need to ensure that **CORS is set up correctly** to handle **authorization headers**.


   but that's for another day. 😄
