import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please provide a name"],
         trim: true,
         minLenght: [2, "Name must be at least 2 characters"],
         maxLength: [50, "Name cannot be more than 50 characters"],
      },
      email: {
         type: String,
         required: [true, "Please provide an email"],
         unique: true,
         trim: true,
         lowercase: true,
         match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please provide a valid email",
         ],
      },
      password: {
         type: String,
         required: [true, "Please provide a password"],
         minLenght: [6, "Password must be at least 6 characters"],
         maxLength: [200, "Password cannot be more than 200 characters"],
      },
   },
   { timestamps: true } // createdAt, updatedAt
);


const User = mongoose.model("User", userSchema);


export default User;


//{name: "Jigx", email: "jigx04@gmail.com", password: "123456"}