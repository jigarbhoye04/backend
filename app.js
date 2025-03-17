import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscriptions.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json()); //middleware to parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); //middleware to parse incoming requests with urlencoded payloads, like forms dat sent from simple html forms to the server
app.use(cookieParser()); //middleware to parse incoming requests with cookies to store user data
app.use(arcjetMiddleware); //middleware to protect the app from common attacks like SQL injection, detect bots, and rate limit requests

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);
app.use(errorMiddleware);

// Routes
app.get("/", (req, res) => {
   res.send("Welcome to the Subscription tracker API");
});

//MAKING SERVER LISTEN for requests trying to access specific routes
app.listen(PORT, async () => {
   console.log(
      `Subscription Tracker API is running on http://localhost:${PORT}`
   );

   await connectToDatabase();
});

export default app;
