import { Response } from 'express';

export function handleError(res: Response, error: unknown, message: string) {
    return res.status(500).json({
        success: false,
        message,
        error: (error as Error).message,
    });
}