import Subscription from "../models/subscription.model.js";

export const getAllSubscriptions = async (req, res, next) => {
   try {
      const subscriptions = await Subscription.find();
      res.status(200).json({
         success: true,
         data: subscriptions,
      });
   } catch (error) {
      next(error);
   }
};

export const getSubscriptionDetails = async (req, res, next) => {
   try {
      const subscription_id = req.params.id;
      const subscription = await Subscription.findById(subscription_id);
      if (!subscription) {
         const error = new Error(
            `Subscription not found with id: ${subscription_id}`
         );
         error.status = 404;
         throw error;
      }
      res.status(200).json({
         success: true,
         data: subscription,
      });
   } catch (error) {
      next(error);
   }
};

export const createSubscription = async (req, res, next) => {
   try {
      const subscription = await Subscription.create({
         ...req.body,
         user: req.user._id, //which user is creating the subscription
      });

      res.status(201).json({
         success: true,
         data: subscription,
      });
   } catch (error) {
      next(error);
   }
};

export const getUserSubscriptions = async (req, res, next) => {
   try {
      if (req.user.id !== req.params.id) {
         const error = new Error(
            "Unauthorized | You are not owner of this account"
         );
      }

      const subscriptions = await Subscription.find({ user: req.params.id });
      res.status(200).json({
         success: true,
         data: subscriptions,
      });
   } catch (error) {
      next(error);
   }
};
