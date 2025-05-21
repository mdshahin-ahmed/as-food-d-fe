import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow("")
    .optional(),
  mobile: Joi.string()
    .length(11)
    .pattern(/^01\d+$/)
    .required()
    .messages({
      "string.length": "Please provide a valid number",
      "string.pattern.base": "Please provide a valid number",
      "any.required": "Mobile number is required.",
    }),
  address: Joi.string().min(3).max(50).required(),
  area: Joi.string().min(1).max(30).required(),
  bill: Joi.when("role", {
    switch: [
      {
        is: "user",
        then: Joi.number().positive().required().messages({
          "number.positive": "Bill must be a positive number",
        }),
      },
      {
        is: Joi.valid("admin", "employee"),
        then: Joi.number().min(0).required().messages({
          "number.base": "Bill must be a number.",
          "number.min": "Bill must be 0 or a positive number",
        }),
      },
    ],
    otherwise: Joi.forbidden(),
  }),
  password: Joi.string().min(5).max(30).required(),
  role: Joi.string().valid("admin", "employee", "user").required().messages({
    "string.base": "Role must be a text.",
    "any.only": "Role must be one of admin or employee or user",
    "any.required": "Role is required.",
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .allow("")
    .email({ tlds: { allow: false } })
    .required(),
  mobile: Joi.string()
    .length(11)
    .pattern(/^01\d+$/)
    .required()
    .messages({
      "string.length": "Please provide a valid number",
      "string.pattern.base": "Please provide a valid number",
      "any.required": "Mobile number is required.",
    }),
  bill: Joi.when("role", {
    switch: [
      {
        is: "user",
        then: Joi.number().positive().required().messages({
          "number.positive": "Bill must be a positive number for user role.",
        }),
      },
      {
        is: Joi.valid("admin", "employee"),
        then: Joi.number().min(0).required().messages({
          "number.base": "Bill must be a number.",
          "number.min":
            "Bill must be 0 or a positive number for admin or employee.",
        }),
      },
    ],
    otherwise: Joi.forbidden(),
  }),
  address: Joi.string().min(3).max(50).required(),
  area: Joi.string().min(1).max(30).required(),
  password: Joi.string().min(5).max(30).optional(),
  role: Joi.string().valid("admin", "employee", "user").required().messages({
    "string.base": "Role must be a text.",
    "any.only": "Role must be one of admin or employee or user",
    "any.required": "Role is required.",
  }),
});
