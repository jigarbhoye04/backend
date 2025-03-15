import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
   createSubscription,
   getAllSubscriptions,
   getSubscriptionDetails,
   getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscriptionDetails);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) =>
   res.send({ title: "CANCEL subscription" })
);

subscriptionRouter.put("/:id", (req, res) =>
   res.send({ title: "UPDATE subscription" })
);

subscriptionRouter.delete("/:id", (req, res) =>
   res.send({ title: "DELETE subscription" })
);

subscriptionRouter.get("/upcoming-renwals", (req, res) =>
   res.send({ title: "GET upcoming renewals" })
);

export default subscriptionRouter;