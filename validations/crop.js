const Joi = require('@hapi/joi');

const schema = Joi.object({
    name:Joi.string().trim().min(3).max(100).required().error(new Error('Please add a name')),    
    number:Joi.number().integer().required().min(6000000000).max(9999999999).error(new Error('Please enter a valid phone number')),
    email:Joi.string().email().required().error(new Error('Enter a valid mail Id')),
   cropType:Joi.required().error(new Error('Enter a valid crop Type')),
   cropArea:Joi.required().error(new Error('Enter a valid crop area')),
   irrigationTime:Joi.required().error(new Error('Enter a Time')),
});

module.exports = schema;