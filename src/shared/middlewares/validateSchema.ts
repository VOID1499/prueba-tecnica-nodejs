// infra/http/middlewares/validate-schema.middleware.ts
import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

//patron factory
export const validateSchema =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;
    next();
  };
