import { createTransport } from "nodemailer";
import { env } from "process";

import { createDataException, ExceptionCodeEnum, ExceptionItemGravityEnum } from "../../exception/ExceptionCode";
import { GenericException } from "../../exception/GenericException";

class EmailService {
	private static transporter = createTransport({
		host: "smtp.office365.com",
		service: "hotmail",
		port: 587,
		secure: false,
		auth: {
			user: env.EMAIL_USER,
			pass: env.EMAIL_PASS,
		},
	});

	public static async sendEmail(to: string, subject: string, html: string, text: string): Promise<any> {
		const emailSent = await EmailService.transporter.sendMail({
			from: env.EMAIL_FROM,
			to,
			subject,
			html,
			text,
		});

		if (!emailSent) {
			//- Error
			throw new GenericException(createDataException(ExceptionCodeEnum.GENERIC_ANY, "", ExceptionItemGravityEnum.LOW));
		} else {
			return emailSent;
		}
	}
}

export { EmailService };
