const nodemailer = require("nodemailer")
import { AdminEmail, AdminEmailPassword } from "../constants"

export const sendMail = async(userEmail)=> {
    let transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: AdminEmail,
            pass: AdminEmailPassword
        }
    })

    let mailOptions = {
        from : AdminEmail,
        to: userEmail,
        subject : "+50VC",
        text: "done!"
    }

    await transporter.sendMail(mailOptions);
}
  