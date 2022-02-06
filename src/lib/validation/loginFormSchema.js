import Joi from 'joi';
import { constants } from './registerFormSchema';

const LoginFormSchema = Joi.object({
    usernameOrEmail: Joi.string()
        .required()
        .custom((value) => {
            const userExp = constants.usernameRegex.test(value);
            const emailExp = constants.vitEmailRegex.test(value);
            if (userExp || emailExp) return value;
            throw Error;
        })
        .error(new Error('Invalid Email or Username')),
    password: Joi.string().min(8).max(50).label('Password').required().regex(constants.passwordRegex),
});

export default LoginFormSchema;
