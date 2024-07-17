import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as EmailTemplates from 'email-templates';
import * as path from 'path';
import {allTemplate} from '../email-templates';

@Injectable()
export class EmailService {
    private transporter: Transporter;
    private templateParser;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            // auth: {
            //     user: 'tarasdzikovskyi@gmail.com',
            //     pass: 'Christian337',
            // },
            // host: 'smtp.gmail.com',
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: 'tarasdz12367@gmail.com',
                pass: 'yjbknaenyczgftsm',
                // user: 'tarasdzikovskyi@gmail.com',
                // pass: 'Christian337',
            },
            // tls: {
            //     rejectUnauthorized: false,
            // },


            // JXk7d353vv8PpyZZ

        });

        this.templateParser = new EmailTemplates({
            views: {
                root: path.join(process.cwd(), 'src/email-templates'),
            },
        });
    }

    async sendEMail(userMail: string, emailAction: string, context: any = {}) {
        const templateInfo = allTemplate[emailAction];

        console.log(templateInfo);
        console.log(userMail);
        console.log(emailAction);
        console.log(context);


        if (!templateInfo) {
            throw new Error('Wrong template name');
        }

        const { templateName, subject } = templateInfo;
        context.frontendURL = 'https://google.com';

        const html = await this.templateParser.render(templateName, context);

        return await this.transporter.sendMail({
            // from: 'No reply',
            from: 'tarasdz12367@gmail.com',
            to: userMail,
            subject,
            html,
        });
    }
}