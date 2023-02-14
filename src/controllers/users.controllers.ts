import { Request, Response } from "express";
import { createUser, getUsers } from "../services";
import { iUserRequest } from "../interfaces/users.interface";

const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: iUserRequest = req.body;
    const newUser = await createUser(userData);

    return res.status(201).json(newUser);
};

const getAllUsers = async (req: Request, res: Response) => {
    const users = await getUsers();

    return res.status(200).json(users);
};

export { createUserController, getAllUsers };
