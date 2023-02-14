import { client } from "../../database";
import format from "pg-format";
import { iUserRequest, iUserResult } from "../../interfaces/users.interface";
import { AppError } from "../../error";
import { QueryConfig } from "pg";

const createUser = async (userData: iUserRequest) => {
    const validKeys: Array<string> = [
        "active",
        "admin",
        "email",
        "name",
        "password",
    ];
    const keys: Array<string> = Object.keys(userData);

    const allValid: boolean = keys.every((key: string) => {
        return validKeys.includes(key);
    });
    if (!allValid) {
        throw new AppError(`Valid keys are: ${validKeys}`, 400);
    }

    const queryStringVerifyEmail: string = `
    SELECT * FROM 
        users u 
    WHERE 
        email = $1
    `;
    const queryConfigVerifyEmail: QueryConfig = {
        text: queryStringVerifyEmail,
        values: [userData.email],
    };
    const QueryResultVerifyEmail = await client.query(queryConfigVerifyEmail);
    if (QueryResultVerifyEmail.rowCount > 0) {
        throw new AppError("E-mail already exists", 409);
    }

    const queryString: string = format(
        `
    INSERT INTO 
        users (%I)
    VALUES
        (%L)
    RETURNING id, name, email, admin, active;
    `,
        Object.keys(userData),
        Object.values(userData)
    );
    const QueryResult: iUserResult = await client.query(queryString);

    return QueryResult.rows[0];
};

export { createUser };
