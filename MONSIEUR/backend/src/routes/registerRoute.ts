import { Router } from "express";
import { registerCreateController } from "../controllers/registerController";

const routerRegister = Router();

routerRegister.post("/api/v0/register", registerCreateController);

export default routerRegister;
