import * as Joi from 'joi';

export const envSchema = Joi.object({
  APP_PORT: Joi.number().default(3001),
  DATABASE_URL: Joi.string(),
});
