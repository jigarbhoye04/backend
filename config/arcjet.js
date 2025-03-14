import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

if (!ARCJET_KEY) {
   throw new Error("ARCJET_KEY is required in .env file");
}

const isProduction = process.env.NODE_ENV === "production";

const aj = arcjet({
   key: ARCJET_KEY,
   characteristics: ["ip.src"], // Track requests by IP
   rules: [
      shield({ mode: isProduction ? "LIVE" : "DRY_RUN" }),
      detectBot({
         mode: isProduction ? "LIVE" : "DRY_RUN",
         // mode: "DRY_RUN", //to test without blocking
         allow: ["127.0.0.1", "localhost", "::1", "CATEGORY:SEARCH_ENGINE"],
         //full list at https://arcjet.com/bot-list
         onDetect: (req, reason) => {
            console.warn(`Bot detected: ${reason}. IP: ${req.ip}`);
         },
      }),
      tokenBucket({
         mode: "LIVE",
         refillRate: 5, // Refill 5 tokens per interval
         interval: 10, // Refill every 10 seconds
         capacity: 10, // Bucket capacity of 10 tokens

         onLimit: (req) => {
            console.warn(`Rate limit exceeded. IP: ${req.ip}`);
         },
      }),
   ],
});

export default aj;
