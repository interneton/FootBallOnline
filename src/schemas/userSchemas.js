import Joi from 'joi';

export const signUpSchema = Joi.object({
  account: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
  teamName: Joi.string().min(3).required()
});