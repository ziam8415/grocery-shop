import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./routers";
import { applyGlobalMiddleware, globalErrorHandler } from "./middlewares";
import passport from "passport";
import "./config/passport";

dotenv.config();

const app: Application = express();

// Global middleware
applyGlobalMiddleware(app);

//passport
app.use(passport.initialize());

// All API routes
app.use("/api/v1", routes);

// home
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

// Global error handler (ALWAYS LAST)
app.use(globalErrorHandler);

export default app;
