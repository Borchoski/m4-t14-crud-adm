import { Request, Response, NextFunction } from "express";

class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

const handleErrors = (
    error: Error,
    req: Request,
    res: Response,
    _: NextFunction
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
    console.log(error);
    return res.status(500).json({
        message: "Internal server error",
    });
};

export { AppError, handleErrors };
