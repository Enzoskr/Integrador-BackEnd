import jwt from "jsonwebtoken";

export const generarJWT = (id: string = ""): Promise<string> => {
  const payload = { id };
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.CLAVEDEJWT as string,
      {
        expiresIn: "2h",
      },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.log(err);
          rej("No se pudo generar el token");
        } else {
          res(token as string);
        }
      }
    );
  });
};
