import Joi from "joi";

export const withdrawReqVSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
    "number.min": "Amount must be at least 49",
    "any.required": "Amount is required",
  }),
});
