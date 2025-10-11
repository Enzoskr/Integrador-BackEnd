import nodeMailer from "nodemailer";
const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "enzoescudero210@gmail.com",
        pass: "ulufhbvdpbvrwyca",
    },
    from: "enzoescudero210@gmail.com",
});
export const sendEmail = async (to, code) => {
    const mailOptions = {
        from: "'ENZO ESCUDERO' enzoescudero210@gmail.com ",
        to,
        subject: "codigo para verificar la cuenta en PATAGLORIA",
        text: ` codigo para verificar en patagloria. ${code}
     `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("mail enviado");
    }
    catch (error) {
        console.log("Error al enviar el mail", error);
    }
};
