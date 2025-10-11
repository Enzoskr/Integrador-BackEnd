import jwt from "jsonwebtoken";
import Usuario from "../models/usuarios";
const validarJWT = async (req, res, next) => {
    const token = req.headers["x-token"];
    if (!token) {
        res.status(401).json({
            msg: "No hay token en la petición",
        });
        return;
    }
    try {
        const claverSecreta = process.env.CLAVEDEJWT;
        const payload = jwt.verify(token, claverSecreta);
        const { id } = payload;
        const usuarioConfirmado = await Usuario.findById(id);
        if (!usuarioConfirmado) {
            res.status(401).json({
                msg: "usuario no encontrado en DB- token no válido",
            });
            return;
        }
        req.body.usuarioConfirmado = usuarioConfirmado;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
};
export default validarJWT;
