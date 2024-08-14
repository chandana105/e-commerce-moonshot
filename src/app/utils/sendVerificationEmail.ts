import { resend } from "../../helpers/resend";
import { EmailTemplate } from "../../../emailTemplate/index";

interface sendVerificationEmailParams {
  email: string;
  name: string;
  otp: number;
}

export async function sendVerificationEmail({
  email,
  name,
  otp,
}: sendVerificationEmailParams) {
  try {
    const { data } = await resend.emails.send({
      from: "OTP <ecommerce_moonshot_roc8@coderdevhub.in>",
      to: email,
      subject: "E-commerce Roc8 | Verification OTP ",
      react: EmailTemplate({ name, email, otp }),
    });

    if (data) {
      return {
        success: true,
        message: "Verification email sent successfully.",
      };
    }
    return {
      success: false,
      message: "Unable to send email!",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: "Failed to send verification email.",
      };
    }
  }
}
