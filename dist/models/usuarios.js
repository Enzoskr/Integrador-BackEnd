import { Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";
const UserSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    rol: {
        type: String,
        default: ROLES.user,
    },
    code: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
});
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, code, ...usuario } = this.toObject();
    return usuario;
};
const Usuario = model("Usuario", UserSchema);
export default Usuario;
