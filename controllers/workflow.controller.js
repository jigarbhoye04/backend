import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import Subscription from "../models/subscription.model";
const require = createRequire(import.meta.url); // Construct the require method

const { serve } = require("@upstash/workflow/express");

export const sendReminder = serve(async (context) => {
   const { subscription_id } = context.requestPayload;
   const subscription = await fetchSubscription(context, subscription_id);
});


const fetchSubscription = async (context, subscription_id) => {
    return await context.run('get subscription', ()=>{
        return Subscription.findById(subscription_id).populate('user','name email');
    });
}
