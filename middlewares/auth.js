import { ErrorHandler } from "../utils/customErrorHandler.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];

  if (!token) {
    return next(new ErrorHandler("Not Logged in!", 401));
  }

  next();
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only Admin can access this resource!", 405));
  }
  next();
};
