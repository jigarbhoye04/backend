import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

console.log("Workflow controller loaded");

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  console.log("Sending reminders");
   const { subscriptionId } = context.requestPayload;
   const subscription = await fetchSubscription(context, subscriptionId);

   if (!subscription || subscription.status !== "active") return;

   const renewalDate = dayjs(subscription.renewalDate);

   if (renewalDate.isBefore(dayjs())) {
      console.log(
         `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`
      );
      return;
   }

   for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, "day");

      console.log(`Current Date: ${dayjs().format("YYYY-MM-DD")}`);
      console.log(`Renewal Date: ${renewalDate.format("YYYY-MM-DD")}`);
      console.log(`Reminder Date: ${reminderDate.format("YYYY-MM-DD")}`);

      console.log(
         `Checking reminder for ${daysBefore} days before: ${reminderDate.format(
            "YYYY-MM-DD"
         )}`
      );

      if (reminderDate.isAfter(dayjs())) {
         console.log(
            `Sleeping until ${daysBefore} days before reminder at ${reminderDate.format(
               "YYYY-MM-DD"
            )}`
         );
         await sleepUntilReminder(
            context,
            `Reminder ${daysBefore} days before`,
            reminderDate
         );
      } else if (dayjs().isSame(reminderDate, "day")) {
         console.log(`Triggering ${daysBefore} days before reminder`);
         await triggerReminder(
            context,
            `${daysBefore} days before reminder`,
            subscription
         );
      } else {
         console.log(
            `Skipped reminder for ${daysBefore} days before: ${reminderDate.format(
               "YYYY-MM-DD"
            )}`
         );
      }
   }
});

const fetchSubscription = async (context, subscriptionId) => {
   return await context.run("get subscription", async () => {
      return Subscription.findById(subscriptionId).populate(
         "user",
         "name email"
      );
   });
};

const sleepUntilReminder = async (context, label, date) => {
   console.log(`Sleeping until ${label} reminder at ${date}`);
   await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
   return await context.run(label, async () => {
      console.log(`Triggering ${label} reminder`);

      await sendReminderEmail({
         to: subscription.user.email,
         type: label,
         subscription,
      });
   });
};
