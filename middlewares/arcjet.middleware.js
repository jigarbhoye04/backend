import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
   try {
      const decision = await aj.protect(req, { requested: 1 });

      if (decision?.isDenied()) {
         const reason = decision?.reason;

         if (reason?.isRateLimit()) {
            return res
               .status(429)
               .json({ error: "Rate limit exceeded. Please try again later." });
         }
         if (reason?.isBot()) {
            return res
               .status(403)
               .json({ error: "Bot activity detected. Access denied." });
         }

         return res
            .status(403)
            .json({
               error: "Access denied. Contact support if this is an error.",
            });
      }

      next();
   } catch (error) {
      console.error("Arcjet Middleware Error:", {
         error: error.message,
         stack: error.stack,
      });

      res.status(500).json({
         error: "Internal server error. Please try again later.",
      });
   }
};

export default arcjetMiddleware;
