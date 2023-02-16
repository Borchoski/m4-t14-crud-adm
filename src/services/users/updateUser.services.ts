import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../error";

const updateUserService = async (userData: any, id: number, token: any) => {
    if (!token || token.length <= 6) {
        throw new AppError("Missing authorization token", 401);
    }
    const queryStringVerifyId: string = `
    SELECT * FROM 
        users u 
    WHERE 
        id = $1;
    `;
    const queryConfigVerifyId: QueryConfig = {
        text: queryStringVerifyId,
        values: [id],
    };
    const QueryResultVerifyId = await client.query(queryConfigVerifyId);
    if (QueryResultVerifyId.rowCount === 0) {
        throw new AppError("Id not Found", 400);
    }

    const queryString: string = format(
        `
    UPDATE 
        users 
    SET
        (%I) = ROW(%L) 
    WHERE 
        id = $1
    RETURNING  id, name, email, admin, active;
    `,
        Object.keys(userData),
        Object.values(userData)
    );

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult = await client.query(queryConfig);

    return queryResult.rows[0];
};

export { updateUserService };
