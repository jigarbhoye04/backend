import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import errorMiddleware from "../middlewares/error-middleware.js";

const userRouter = Router();

//GET /users -> get all users
//GET /users/:id -> get a user by id    //users/123

// userRouter.get('/', (req, res) => res.send({ title: 'GET all users' }));
userRouter.get("/", errorMiddleware, getUsers);

// userRouter.get('/:id', (req, res) => res.send({ title: 'GET user details' })); //:id = dyanmaic parameter
userRouter.get("/:id", authorize, errorMiddleware, getUser); //:id = dyanmaic parameter

userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }));

userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
