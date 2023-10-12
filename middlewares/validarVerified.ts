import { NextFunction, Request, Response } from "express";

export const isVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { verified } = req.body.usuarioConfirmado;

  if (!verified) {
    res.status(401).json({
      msg: "Usuario no verificado",
    });
    return;
  }
  next();
};
