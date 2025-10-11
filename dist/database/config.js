import mongoose from "mongoose";
export const dbConnection = async () => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("la url no esta definida en los .env");
        }
        await mongoose.connect(dbURL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la base de datos");
    }
};
