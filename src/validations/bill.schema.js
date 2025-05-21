import Joi from "joi";

export const billSchema = Joi.object({
  monthName: Joi.string()
    .valid(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    )
    .required()
    .label("Month")
    .messages({
      "any.required": `Month is required`,
      "string.base": `Month must be a string`,
      "any.only": `Month is required`,
    }),
});
