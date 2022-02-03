import Joi from 'joi';

const myCustomJoi = Joi.extend(require('joi-phone-number'));

const registerFormSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(20).required().label("username").error(new Error("Username should be min 3 and max 3")),
    password: Joi.string().min(8).max(50).required().pattern(new RegExp(/^[a-zA-Z0-9`!@#$%^&*()-/:'.,{}_"~]{8,50}$/)),
    passwordConfirmation: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
    email: Joi.string().required().pattern(new RegExp(`/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((vitstudent.ac.in)|(vit.ac.in))$/`)).error(new Error("Invalid VIT Email Address.")),
    phone: myCustomJoi.string().required().phoneNumber().error(new Error("Invalid Phone number")),
    isVitian: Joi.boolean().required(),
    regNo: Joi.string().required().pattern(new RegExp("/^\d\d[A-Z]{3}[0-9]{4}$/")).error(new Error("Invalid VIT Reg No")),
    gender: Joi.string().valid(...['M', 'F']).error(new Error("Invalid gender"))
});

export default registerFormSchema;