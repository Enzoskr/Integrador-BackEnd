import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario, { IUser } from "../models/usuarios";

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-token"] as string;

  if (!token) {
    res.status(401).json({
      msg: "No hay token en la petición",
    });
    return;
  }
  try {
    const claverSecreta = process.env.CLAVEDEJWT as string;
    const payload = jwt.verify(token, claverSecreta) as JwtPayload;
    const { id } = payload;
    const usuarioConfirmado: IUser | null = await Usuario.findById(id);

    if (!usuarioConfirmado) {
      res.status(401).json({
        msg: "usuario no encontrado en DB- token no válido",
      });
      return;
    }
    req.body.usuarioConfirmado = usuarioConfirmado;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export default validarJWT;
