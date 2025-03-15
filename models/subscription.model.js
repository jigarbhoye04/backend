import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please provide a subscription name"],
         trim: true,
         minLenght: [2, "Name must be at least 2 characters"],
         maxLength: [100, "Name cannot be more than 50 characters"],
      },
      price: {
         type: Number,
         required: [true, "Please provide a subscription price"],
         min: [0, "Price cannot be negative"],
         max: [1000, "Price cannot be more than 1000"],
      },
      currency: {
         type: String,
         enum: ["INR", "USD", "EUR", "GBP"],
         default: "INR",
         // required: [true, "Please provide a currency"],
         // trim: true,
         // minLenght: [3, "Currency must be at least 3 characters"],
         // maxLength: [3, "Currency cannot be more than 3 characters"],
      },
      frequency: {
         type: String,
         enum: ["daily", "weekly", "monthly", "yearly"],
         default: "monthly",
         // required: [true, "Please provide a frequency"],
         // trim: true,
         // minLenght: [3, "Frequency must be at least 3 characters"],
         // maxLength: [7, "Frequency cannot be more than 7 characters"],
      },
      category: {
         type: String,
         enum: [
            "Entertainment",
            "Education",
            "Health",
            "Finance",
            "Shopping",
            "Others",
         ],
         required: [true, "Please provide a category"],
      },
      paymentMethod: {
         type: String,
         required: [true, "Please provide a payment method"],
         trim: true,
      },
      status: {
         type: String,
         enum: ["active", "cancelled", "expired", "paused"],
         default: "active",
      },
      startDate: {
         type: Date,
         required: [true, "Please provide a start date"],
         validate: {
            validator: function (value) {
               return value <= new Date();
            },
            message: "Start date cannot be in the future",
         },
      },
      renewalDate: {
         type: Date,
         //  required: [true, "Please provide a renewal date"], //auto calculate renewal date if missing
         validate: {
            validator: function (value) {
               return value >= this.startDate;
            },
            message: "Renewal date cannot be before start date",
         },
      },
      //reference to the user who created the subscription
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: [true, "Please provide a user"],
         index: true, //for faster queries
      },
   },
   { timestamps: true }
);

//creating a function that will happen before each one of the documents is created

//auto calculate renewal date if missing
subscriptionSchema.pre("save", function (next) {
   if (!this.renewalDate) {
      const renewalPeriods = {
         daily: 1,
         weekly: 7,
         monthly: 30,
         yearly: 365,
      };

      this.renewalDate = new Date(this.startDate);
      this.renewalDate.setDate(
         this.renewalDate.getDate() + renewalPeriods[this.frequency]
      );
   }

   //auto-update the status if the renewal date has passed
   if (this.renewalDate < new Date()) {
      this.status = "expired";
   }

   next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
