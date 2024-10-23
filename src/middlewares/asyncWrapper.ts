import { Request, Response, NextFunction } from 'express';

type asyncFn = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncWrapper = (asyncFn: asyncFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncFn(req, res, next).catch((err) => {
            next(err);
        });
    };
};