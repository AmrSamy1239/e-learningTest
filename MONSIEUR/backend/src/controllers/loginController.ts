import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const loginShowController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      return next(err); // This will handle any error that occurs.
    }
    if (!user) {
      // Handle the case where the user is not found or the password is incorrect.
      return res.status(401).json("Email or password dosn't match!!");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // If login is successful, send a success message.
      return res.json("Yes");
    });
  })(req, res, next);
};
