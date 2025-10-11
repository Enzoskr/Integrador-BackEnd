import jwt from "jsonwebtoken";
export const generarJWT = (id = "") => {
    const payload = { id };
    return new Promise((res, rej) => {
        jwt.sign(payload, process.env.CLAVEDEJWT, {
            expiresIn: "2h",
        }, (err, token) => {
            if (err) {
                console.log(err);
                rej("No se pudo generar el token");
            }
            else {
                res(token);
            }
        });
    });
};
