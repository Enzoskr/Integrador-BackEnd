export const isVerified = async (req, res, next) => {
    const { verified } = req.body.usuarioConfirmado;
    if (!verified) {
        res.status(401).json({
            msg: "Usuario no verificado",
        });
        return;
    }
    next();
};
