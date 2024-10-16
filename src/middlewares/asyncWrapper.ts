import { Request, Response, NextFunction } from 'express';

export const asyncWrapper = (asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncFn(req, res, next).catch((err) => {
            next(err);
        });
    };
};