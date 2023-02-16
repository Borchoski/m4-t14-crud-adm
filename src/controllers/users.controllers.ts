import { Request, Response } from "express";
import { createUser, getUsers, softDeleteUser, getUnicUser } from "../services";
import { iUserRequest } from "../interfaces/users.interface";
import { updateUserService } from "../services/users/updateUser.services";

const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: iUserRequest = req.body;
    const newUser = await createUser(userData);

    return res.status(201).json(newUser);
};

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    const users = await getUsers(token!);

    return res.status(200).json(users);
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id;
    const token = req.headers.authorization;
    softDeleteUser(id, token!);

    return res.json();
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
    const authToken = req.headers.authorization;
    const user = await getUnicUser(authToken!);

    return res.json(user);
};

const updateUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData = req.body;
    const id: number = +req.params.id;
    const token = req.headers.authorization;
    const updateUser = await updateUserService(userData, id, token);

    return res.json(updateUser);
};

export {
    createUserController,
    getAllUsers,
    deleteUser,
    getUser,
    updateUserController,
};
