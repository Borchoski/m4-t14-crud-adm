import { Router } from "express";
import {
    activeUserController,
    createUserController,
    deleteUser,
    getAllUsers,
    getUser,
    updateUserController,
} from "../controllers/users.controllers";

import { createUserSchema } from "../schemas/users.schemas";

import { ensureDataIsValidMiddleware } from "../middlewares";
import { verifyPermissionLevel } from "../middlewares/verifyPermission.middlewares";

const usersRouter: Router = Router();

usersRouter.post(
    "",
    ensureDataIsValidMiddleware(createUserSchema),
    createUserController
);
usersRouter.get("", verifyPermissionLevel, getAllUsers);
usersRouter.get("/profile", getUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.patch("/:id", updateUserController);
usersRouter.put("/:id/recover", verifyPermissionLevel, activeUserController);

export { usersRouter };
