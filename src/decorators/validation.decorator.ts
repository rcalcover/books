import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

type ValidateSource = 'body' | 'params';

export function Validate(schema: ZodSchema, source: ValidateSource = 'body') {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const data = source === 'body' ? req.body : req.params;
      const result = schema.safeParse(data);
      if (!result.success) {
        return res.status(400).json({ status: 'fail', error: 'Bad request' });
      }
      if (source === 'body') {
        req.body = result.data;
      } else {
        req.params = result.data;
      }
      return originalMethod.call(this, req, res, next);
    };
  };
}
