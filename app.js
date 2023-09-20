import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/provider.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
// Importing routes
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
export default app;

dotenv.config({
  path: "./config/config.env",
});

connectPassport();

// Using Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "Development" ? false : true,
      httpOnly: process.env.NODE_ENV === "Development" ? false : true,
      sameSite: process.env.NODE_ENV === "Development" ? false : "none",
    },
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Using Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

// Using Error Middlware (It must be user at the end of app.js!)
app.use(errorMiddleware);
