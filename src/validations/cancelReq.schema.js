import Joi from "joi";

export const cancelReqVSchema = Joi.object({
  mealName: Joi.string().required().messages({
    "any.required": "Meal name is required.",
    "string.empty": "Meal name is required.",
  }),
  mealType: Joi.string().required().messages({
    "any.required": "Meal type is required.",
    "string.empty": "Meal type is required.",
  }),
  reason: Joi.string().min(5).max(500).required().messages({
    "string.base": "Reason must be a text.",
    "string.empty": "Reason is required.",
    "string.min": "Reason must be at least 10 characters long.",
    "string.max": "Reason must be less than or equal to 500 characters long.",
    "any.required": "Reason is required.",
  }),
});
