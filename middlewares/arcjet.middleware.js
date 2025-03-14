import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
   try {
      const decision = await aj.protect(req, { requested: 1 });
      if (decision.isDenied) {
         if (decision.reason.isRateLimit()) {
            res.status(429).json({
               success: false,
               message: "Too Many Requests | Rate Limit Exceeded",
            });
         } else if (decision.reason.isBot()) {
            res.status(403).json({
               success: false,
               message: "Bots Detected | No bots allowed",
            });
         } else {
            res.status(403).json({
               success: false,
               message: "Forbidden",
            });
         }

         next();
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Internal server error | Arcjet Middleware Error",
      });
   }
};

export default arcjetMiddleware;
