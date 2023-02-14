import { Router } from "express";
import {
    createUserController,
    getAllUsers,
} from "../controllers/users.controllers";

const usersRouter: Router = Router();

usersRouter.post("", createUserController);
usersRouter.get("", getAllUsers);

export { usersRouter };
