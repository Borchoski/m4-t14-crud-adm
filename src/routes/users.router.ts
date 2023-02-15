import { Router } from "express";
import {
    createUserController,
    deleteUser,
    getAllUsers,
    getUser,
} from "../controllers/users.controllers";

import { createUserSchema } from "../schemas/users.schemas";

import { ensureDataIsValidMiddleware } from "../middlewares";

const usersRouter: Router = Router();

usersRouter.post(
    "",
    ensureDataIsValidMiddleware(createUserSchema),
    createUserController
);
usersRouter.get("", getAllUsers);
usersRouter.get("/profile", getUser);
usersRouter.delete("/:id", deleteUser);

export { usersRouter };
