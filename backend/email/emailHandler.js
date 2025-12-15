import { resendClient, sender } from "../config/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to QuickChat",
        html: createWelcomeEmailTemplate(name, clientURL),
    })

    if (error) {
        console.error("Error sending welcome email", error)
        throw new Error("Failed to send welcome email")
    }

    console.log("Welcome Email that successfully", data)
}