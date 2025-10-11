import { Request, Response } from "express";
import Usuario, { IUser } from "../models/usuarios";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { generarJWT } from "../helpers/generarJWT";

export const register = async (req: Request, res: Response) => {
  const { email, nombre, password }: IUser = req.body;

  const usuario = new Usuario({ email, nombre, password });

  const salt = bcryptjs.genSaltSync();

  usuario.password = bcryptjs.hashSync(password, salt);

  const newCode = randomstring.generate(6);

  usuario.code = newCode;

  await usuario.save();

  await sendEmail(email, newCode);

  res.status(201).json({
    msg: "Usuario creado exitosamente",
    usuario,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      res.status(400).json({
        msg: "No se ha Encontrado el mail",
      });
      return;
    }
    const validatePassword = bcryptjs.compareSync(password, usuario.password);

    if (!validatePassword) {
      res.status(400).json({
        msg: "La contraseña es Incorrecta",
      });
      return;
    }

    const token = await generarJWT(usuario.id);
    res.status(202).json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      res.status(404).json({
        msg: "no se encontró el mail en la base de datos",
      });
      return;
    }
    if (usuario.verified) {
      res.status(400).json({
        msg: "El usuario ya ha sido verificado",
      });
      return;
    }

    if (code !== usuario.code) {
      res.status(401).json({
        msg: "El código es incorrecto",
      });
      return;
    }

    await Usuario.findOneAndUpdate({ email }, { verified: true });

    res.status(200).json({
      msg: "Usuario verificado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};
