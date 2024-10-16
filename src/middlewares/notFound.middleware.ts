import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/api.error';

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError('This resource is unavailable', 404));
};

export default notFoundMiddleware;