import Joi from 'joi';

// 게임 스키마
export const playGameSchema = Joi.object({
  userId: Joi.number().integer().required(),
  result: Joi.string().valid('win', 'loss', 'draw').required()
});

// 플레이어
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

// 상점 스키마
export const purchaseCashSchema = Joi.object({
  userId: Joi.number().integer().required(),
  amount: Joi.number().integer().min(1).required()
});

export const drawPlayerSchema = Joi.object({
  packId: Joi.number().integer().required()
});

export const createPackSchema = Joi.object({
  packname: Joi.string().required(),
  sspb: Joi.number().integer().min(0).max(100).required(),
  apb: Joi.number().integer().min(0).max(100).required(),
  bpb: Joi.number().integer().min(0).max(100).required(),
  cpb: Joi.number().integer().min(0).max(100).required(),
  fpb: Joi.number().integer().min(0).max(100).required(),
  price: Joi.number().integer().min(0).required()
});


// 사용자 스키마
export const signUpSchema = Joi.object({
  account: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
  teamName: Joi.string().min(3).required()
});
