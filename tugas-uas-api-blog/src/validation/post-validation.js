import Joi from "joi";

const createPostValidation = Joi.object({
  slug: Joi.string()
    .regex(/^[0-9a-zA-Z$_.+!*'()-]+$/, { name: "URL Safe Chars" })
    .max(150)
    .required(),
  title: Joi.string().max(100).required(),
  summary: Joi.string().max(500).optional(),
  content: Joi.string().max(2000).required(),
});

const getPostValidation = Joi.string().max(150).required();

const updatePostValidation = Joi.object({
  id: Joi.string().max(100).required(),
  slug: Joi.string()
    .regex(/^[0-9a-zA-Z$_.+!*'()-]+$/, { name: "URL Safe Chars" })
    .max(150)
    .lowercase()
    .optional(),
  title: Joi.string().max(100).optional(),
  summary: Joi.string().max(500).optional(),
  content: Joi.string().max(2000).optional(),
});

const searchPostValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  slug: Joi.string()
    .regex(/^[0-9a-zA-Z$_.+!*'()-]+$/, { name: "URL Safe Chars" })
    .max(150)
    .lowercase()
    .optional(),
  title: Joi.string().max(100).optional(),
  summary: Joi.string().max(500).optional(),
  content: Joi.string().max(2000).optional(),
  authorId: Joi.string().optional(),
});

export {
  createPostValidation,
  getPostValidation,
  updatePostValidation,
  searchPostValidation,
};
