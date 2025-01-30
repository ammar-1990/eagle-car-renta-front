import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async ({subject,text,to,html}:{to: string, subject: string, text: string, html?: string}) => {
    try {
        await sendgrid.send({
            to,
            from: "info@eaglerentalcar.com", // Must be a verified email
            subject,
            text,
            html,
        });

        console.log(`📨 Email sent to ${to}`);
        return { success: true };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, error };
    }
};

export default sendEmail;