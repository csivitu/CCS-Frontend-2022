import Joi from 'joi';
import { parsePhoneNumber } from 'libphonenumber-js';

export const constants = {
    vitEmailRegex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((vitstudent.ac.in)|(vit.ac.in))$/,
    passwordRegex: /^[a-zA-Z0-9`!@#$%^&*()-/:'.,{}_"~]{8,50}$/, // 8-50 characters,
    regNoRegex: /^\d\d[A-Z]{3}[0-9]{4}$/,
    usernameRegex: /^[a-zA-Z0-9`!@#$%^&*()-/:'.,{}_"~]{3,20}$/,
};


const registerFormSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().label("Name").error(new Error("Name should be min 3 and max 50")),
    username: Joi.string().min(3).max(20).required().label("Username").regex(new RegExp(constants.usernameRegex)).error(new Error("Username should be min 3 and max 20 and not include any spaces")),
    password: Joi.string().min(8).max(50).required().regex(new RegExp(constants.passwordRegex)),
    passwordConfirmation: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
    email: Joi.string().required().regex(new RegExp(constants.vitEmailRegex)).error(new Error("Invalid VIT Email Address.")),
    phone: Joi.string().required().label("Phone").custom((value) => {
        if (parsePhoneNumber(value).isValid()) {
            return value
        }
    }).error(new Error("Invalid Phone Number: check if you have added country code.")),
    isVitian: Joi.boolean().required(),
    regNo: Joi.string().required().regex(new RegExp(constants.regNoRegex)).error(new Error("Invalid VIT Reg No")),
    gender: Joi.string().required().valid(...['M', 'F', 'NB', 'O', 'P']).error(new Error("Invalid Gender"))
});

export default registerFormSchema;