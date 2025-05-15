import Joi from "joi";

export const mealValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Meal name must be a text.",
    "string.empty": "Meal name is required.",
    "string.min": "Meal name must be at least 3 characters long.",
    "string.max": "Meal name must be less than or equal to 30 characters long.",
    "any.required": "Meal name is required.",
  }),

  type: Joi.string().valid("সকাল", "দুপুর", "রাত").required().messages({
    "string.base": "Meal type must be a text.",
    "any.only": "Meal type must be one of সকাল, দুপুর, or রাত.",
    "any.required": "Meal type is required.",
  }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be a positive number.",
    "number.precision": "Price can have at most 2 decimal places.",
    "any.required": "Price is required.",
  }),

  stock: Joi.number().min(0).precision(3).required().messages({
    "number.base": "Stock must be a number.",
    "number.min": "Stock must be at least 0.",
    "number.precision": "Stock can have at most 3 decimal places.",
    "any.required": "Stock is required.",
  }),

  description: Joi.string().min(5).max(500).required().messages({
    "string.base": "Description must be a text.",
    "string.empty": "Description is required.",
    "string.min": "Description must be at least 5 characters long.",
    "string.max":
      "Description must be less than or equal to 100 characters long.",
    "any.required": "Description is required.",
  }),
});
