import { Request, Response, NextFunction } from 'express';
import { sanitizeBody } from "express-validator/filter";

export function sanitizeStories(req: Request, res: Response, next: NextFunction): void {
  sanitizeBody("title").trim().escape();
  sanitizeBody("privacy").trim().escape();
  sanitizeBody("likes").toFloat().trim().escape();
  sanitizeBody("launch_date").trim().escape();
  return next();
}

