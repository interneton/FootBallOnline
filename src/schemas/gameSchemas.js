import Joi from 'joi';

export const playGameSchema = Joi.object({
  userId: Joi.number().integer().required(),
  result: Joi.string().valid('win', 'loss', 'draw').required()
});
