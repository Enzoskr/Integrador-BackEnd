import { ROLES } from "../helpers/constants";
export const isAdmin = (req, res, next) => {
    const { rol } = req.body.usuarioConfirmado;
    if (rol !== ROLES.admin) {
        res.status(401).json({
            msg: "El usuario no es administrador",
        });
        return;
    }
    next();
};
