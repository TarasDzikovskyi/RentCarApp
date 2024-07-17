import emailActionEnum from '../config/emailActionEnum';

export const allTemplate = {
    [emailActionEnum.CREATE]: {
        templateName: 'create',
        subject: 'Hello, you are created account!'
    },
    [emailActionEnum.FORGOT]: {
        templateName: 'forgot',
        subject: 'Complete your password reset request'
    },
    [emailActionEnum.CHANGE]: {
        templateName: 'change',
        subject: 'Your password has been changed'
    },
    [emailActionEnum.ACTIVATE]: {
        templateName: 'activate',
        subject: 'Please, activate your account'
    },
};

