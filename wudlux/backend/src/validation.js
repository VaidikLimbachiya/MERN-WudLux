const Joi = require("joi");

// User Registration Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.object({
      street: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
    }).required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });

  return schema.validate(data);
};

module.exports = { registerValidation };
