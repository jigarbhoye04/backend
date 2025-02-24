import mongoose from "mongoose";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//req body = an object containing data coming from the client (POST request)
//req params = an object containing route parameters (/:id)

export const signUp = async (req, res, next) => {
   const session = await mongoose.startSession(); //mongoose transaction session rather than user session
   session.startTransaction(); //perform atomic updates (all or nothing)
   try {
      const { name, email, password } = req.body;

      //check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         const error = new Error("User already exists");
         error.statusCode = 409;
         throw error;
      }

      //Hash Password for new user
      const salt = await bcrypt.genSalt(10); //salt - random data that is used as an additional input to a one-way function that hashes data
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUsers = await User.create(
         [{ name, email, password: hashedPassword }],
         { session }
      ); //attaching session so that even if transaction fails, the user is not created

      const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
         expiresIn: "1h",
      });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
         success: true,
         message: "User created successfully",
         data: {
            token,
            user: newUsers[0],
         },
      });
   } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
   }
};

export const signIn = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
         const error = new Error("User not found");
         error.statusCode = 404;
         throw error;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
         const error = new Error("Invalid username or password"); // for extra security, we can use the same error message for both cases
         error.statusCode = 401; //unauthorized
         throw error;
      }

      const token = jwt.sign(
         {
            userId: user._id,
         },
         JWT_SECRET,
         { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(200).json({
         success: true,
         message: "User logged in successfully",
         data: {
            token,
            user,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const signOut = async (req, res, next) => {};
