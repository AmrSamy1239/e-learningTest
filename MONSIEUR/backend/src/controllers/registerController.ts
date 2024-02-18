import { NextFunction, Request, Response } from "express";
import { registerCreateService } from "../services/registerService";
import { UserRouteType } from "../models/userModel";

// Handle data from user and send it to registerCreateService
export const registerCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const registerObj: UserRouteType = {
    username: req.body.username,
    password: req.body.password,
    country: req.body.country,
    image: req.body.image,
    phone: req.body.phone,
    degree: req.body.degree,
    gender: req.body.gender,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
  };
  const result = await registerCreateService(registerObj);
  console.log(result);
  res.status(200).send(result);

  try {
  } catch (error) {
    throw new Error(
      `There is an error in register registerCreateController error : ${error}`
    );
  }
};
