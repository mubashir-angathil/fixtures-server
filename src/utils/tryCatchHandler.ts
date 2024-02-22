import { NextFunction, Request, Response } from "express";

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const tryCatchHandler = (controller: ControllerFunction) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await controller(req, res, next);
            } catch (error) {
                next(error);
            }
        };

export default tryCatchHandler;

// const asyncHandler =
//     <T>(fn: (req: T, res: Response) => Promise<void>) =>
//         async (req: Request, res: Response, next: NextFunction) => {
//             try {
//                 await fn(req as T, res);
//             } catch (error) {
//                 next(error);
//             }
//         };
