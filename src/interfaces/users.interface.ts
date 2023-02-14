import { QueryResult } from "pg";

interface iUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
    active?: boolean;
}

interface iUser extends iUserRequest {
    id: number;
}

type iUserOmitPassword = Omit<iUser, "password">;
type iUserResult = QueryResult<iUserOmitPassword>;
type requiredKeysNewUser = "name" | "email" | "password" | "admin" | "active";

export type {
    iUserRequest,
    iUser,
    iUserOmitPassword,
    iUserResult,
    requiredKeysNewUser,
};
