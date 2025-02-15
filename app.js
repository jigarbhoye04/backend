import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscriptions.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

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
