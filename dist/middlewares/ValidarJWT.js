"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_1 = __importDefault(require("../models/usuarios"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["x-token"];
    if (!token) {
        res.status(401).json({
            msg: "No hay token en la petición",
        });
        return;
    }
    try {
        const claverSecreta = process.env.CLAVEDEJWT;
        const payload = jsonwebtoken_1.default.verify(token, claverSecreta);
        const { id } = payload;
        const usuarioConfirmado = yield usuarios_1.default.findById(id);
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
});
exports.default = validarJWT;