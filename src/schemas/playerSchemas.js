import Joi from 'joi';

export const equipPlayerSchema = Joi.object({
  userId: Joi.number().integer().required(),
  soccerPlayerId: Joi.number().integer().required()
});

export const upgradePlayerSchema = Joi.object({
  userPlayerId: Joi.number().integer().required(),
  upgradeData: Joi.object({
    speed: Joi.number().integer().min(0),
    goalDecision: Joi.number().integer().min(0),
    shootPower: Joi.number().integer().min(0),
    defense: Joi.number().integer().min(0),
    stamina: Joi.number().integer().min(0)
  }).min(1)
});

export const registerPlayerSchema = Joi.object({
  name: Joi.string().required(),
  speed: Joi.number().integer().min(0).max(100).required(),
  goalDecision: Joi.number().integer().min(0).max(100).required(),
  shootPower: Joi.number().integer().min(0).max(100).required(),
  defense: Joi.number().integer().min(0).max(100).required(),
  stamina: Joi.number().integer().min(0).max(100).required(),
});
