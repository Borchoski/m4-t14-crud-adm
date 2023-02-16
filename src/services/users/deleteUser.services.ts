import { Response } from "express";
import { QueryConfig, QueryParse, QueryResult } from "pg";
import client from "../../database/config";
import { AppError } from "../../error";

const softDeleteUser = async (userId: number, authToken: string) => {
    if (!authToken || authToken.length <= 6) {
        throw new AppError("Missing authorization token", 401);
    }

    const id: number = userId;

    const queryStringVerifyId: string = `
    SELECT * FROM 
        users u 
    WHERE 
        id = $1
    `;
    const queryConfigVerifyId: QueryConfig = {
        text: queryStringVerifyId,
        values: [id],
    };
    const QueryResultVerifyId = await client.query(queryConfigVerifyId);
    if (QueryResultVerifyId.rowCount === 0) {
        throw new AppError("Id not Found", 400);
    }

    const queryString: string = `
        UPDATE 
            users
        SET
            "active" = false
        WHERE 
            id = $1
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    await client.query(queryConfig);
};

export { softDeleteUser };
