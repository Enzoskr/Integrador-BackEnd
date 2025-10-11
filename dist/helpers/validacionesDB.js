import { sendEmail } from "../mailer/mailer";
import Usuario from "../models/usuarios";
export const existeEmail = async (email) => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail && existeEmail.verified) {
        throw new Error(`El email ${email} ya esta registrado`);
    }
    if (existeEmail && !existeEmail.verified) {
        await sendEmail(email, existeEmail.code);
        throw new Error(`El email ${email} ya esta registrado, se reenvio el codigo de verificacion`);
    }
};
