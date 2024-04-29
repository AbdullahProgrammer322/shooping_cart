import Joi from 'joi';

const schema = Joi.object({
  first_name: Joi.string().min(3).max(33).required().label('first_name'),
  last_name: Joi.string().min(3).max(33).required().label('last_name'),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .label('Email'),
  password: Joi.string().min(4).max(33).required().label('Password'),
  phone: Joi.string().min(11).max(11).required().label('Phone'),

  address: Joi.string().min(11).max(100).required().label('address'),
});

const validate = async (req, res, next) => {
  let errors = 0;
  let success = 0;

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    success++;
    return next();
  } catch (error) {
    const formattedErrors = {};
    error.details.forEach((err) => {
      formattedErrors[err.context.key] = err.message.replace(/["']/g, '');
      errors++;
    });
    return res.status(400).json({ error: formattedErrors, errors, success });
  }
};

export default validate;
