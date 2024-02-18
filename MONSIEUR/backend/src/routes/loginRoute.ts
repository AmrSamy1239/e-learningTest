import { Router } from "express";
import { loginShowController } from "../controllers/loginController";

const routerLogin = Router();

routerLogin.post("/api/v0/login", loginShowController);

export default routerLogin;
