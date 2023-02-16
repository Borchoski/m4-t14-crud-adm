import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email(),
    password: z.string(),
});

const returnUserSchema = createUserSchema.extend({
    id: z.number(),
    active: z.boolean(),
});

const returnUserSchemaWithoutPassword = returnUserSchema.omit({
    password: true,
});

const allUsersSchema = z.array(returnUserSchemaWithoutPassword);

const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword,
    allUsersSchema,
    loginUserSchema,
};
