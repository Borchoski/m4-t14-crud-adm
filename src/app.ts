import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./error";
import { usersRouter } from "./routes/users.router";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRouter);

app.use(handleErrors);

export default app;
