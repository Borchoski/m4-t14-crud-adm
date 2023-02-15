import { Router } from "express";
import { userLogin } from "../controllers/login.controllers";

const loginRouter: Router = Router();

loginRouter.post("", userLogin);

export { loginRouter };
