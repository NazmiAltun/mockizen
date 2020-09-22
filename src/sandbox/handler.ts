import { Request, Response } from 'express';
type Handler = (req: Request, res: Response) => void;

export default Handler;
