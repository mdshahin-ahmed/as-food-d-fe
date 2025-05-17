import Joi from "joi";

export const billSchema = Joi.object({
  month: Joi.string()
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
    .label("Month"),

  amount: Joi.number().positive().required().label("Amount"),
});
