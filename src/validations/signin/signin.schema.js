import Joi from "joi";

const signinSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^01\d+$/)
    .required()
    .messages({
      "string.length": "Please provide a valid number",
      "string.pattern.base": "Please provide a valid number",
      "any.required": "Mobile number is required.",
    }),
  password: Joi.string().min(5).max(30),
});
const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ tlds: { allow: false } }),
  mobile: Joi.string()
    .length(11)
    .pattern(/^01\d+$/)
    .required()
    .messages({
      "string.length": "Please provide a valid number",
      "string.pattern.base": "Please provide a valid number",
      "any.required": "Mobile number is required.",
    }),
  hostel: Joi.string().min(3).max(30),
  room: Joi.string().min(1).max(4),
  password: Joi.string().min(5).max(30),
});

const changePasswordSchema = Joi.object({
  oldPass: Joi.string().required().messages({
    "string.base": "Old password must be a string",
    "any.required": "Old password is required",
  }),

  newPass: Joi.string().min(5).max(30).required().messages({
    "string.base": "New password must be a string",
    "string.min": "New password must be at least 5 characters long",
    "string.max": "New password must be max 30 characters long",
    "any.required": "New password is required",
  }),

  confirmPass: Joi.string().valid(Joi.ref("newPass")).required().messages({
    "any.only": "New pass and confirm pass doesn't match",
    "any.required": "Confirm password is required",
  }),
});

const sendOtpSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  // password: Joi.string().min(5).max(30),
});
const verifyOtpSchema = Joi.object({
  otp: Joi.string().required().length(6).messages({
    "string.empty": "OTP is required.",
    "string.length": "OTP must be exactly 6 characters long.",
    "any.required": "OTP is required.",
  }),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string().min(5).max(30).required().messages({
    "string.base": "New password must be a string",
    "string.min": "New password must be at least 5 characters long",
    "string.max": "New password must be max 30 characters long",
    "any.required": "New password is required",
  }),
  confirmPass: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "New pass and confirm pass doesn't match",
    "any.required": "Confirm password is required",
  }),
});

export {
  signinSchema,
  signupSchema,
  changePasswordSchema,
  sendOtpSchema,
  verifyOtpSchema,
  updatePasswordSchema,
};
