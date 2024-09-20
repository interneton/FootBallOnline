import Joi from 'joi';

export const purchaseCashSchema = Joi.object({
  userId: Joi.number().integer().required(),
  amount: Joi.number().integer().min(1).required()
});

export const drawPlayerSchema = Joi.object({
  packId: Joi.number().integer().required()
});
