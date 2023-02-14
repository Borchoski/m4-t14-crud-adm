import client from "../../database/config";

const getUsers = async () => {
    const queryString: string = `
    SELECT * FROM users u
    WHERE COLUMN != password;
    `;
    const queryResult = await client.query(queryString);

    return queryResult.rows;
};

export { getUsers };
