import { sendEmail } from "../mailer/mailer";
import Usuario, { IUser } from "../models/usuarios";

export const existeEmail = async (email: string): Promise<void> => {
  const existeEmail: IUser | null = await Usuario.findOne({ email });

  if (existeEmail && existeEmail.verified) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
  if (existeEmail && !existeEmail.verified) {
    await sendEmail(email, existeEmail.code as string);
    throw new Error(
      `El email ${email} ya esta registrado, se reenvio el codigo de verificacion`
    );
  }
};
