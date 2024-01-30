import Joi from "joi";

const createCommentValidation = Joi.object({
  username: Joi.string().max(100).required(),
  message: Joi.string().max(500).required(),
});

const getCommentValidation = Joi.string().max(150).required();

const updateCommentValidation = Joi.object({
  id: Joi.string().max(150).required(),
  message: Joi.string().max(500).optional(),
});

export {
  createCommentValidation,
  getCommentValidation,
  updateCommentValidation,
};
