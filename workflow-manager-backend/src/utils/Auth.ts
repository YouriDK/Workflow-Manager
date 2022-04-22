import { Request, Response, NextFunction } from 'express';

export function isAuth(req: Request, res: Response, next: NextFunction) {
  console.log(`🧨 Authentification to do ...🧨`);
  next();
}
