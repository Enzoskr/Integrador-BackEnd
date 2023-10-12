"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const validacionesDB_1 = require("../helpers/validacionesDB");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatotrio").isEmail(),
    (0, express_validator_1.check)("password", "El password debe ser de 6 caracteres minimo").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("email").custom(validacionesDB_1.existeEmail),
    recolectarErrores_1.recolectarErrores,
], auth_1.register);
router.post("/login", [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "el mail no es valido").isEmail(),
    (0, express_validator_1.check)("password", "El password debe ser de 6 caracteres minimo").isLength({
        min: 6,
    }),
    recolectarErrores_1.recolectarErrores,
], auth_1.login);
router.patch("/verify", [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El mail no es válido").isEmail(),
    (0, express_validator_1.check)("code").not().isEmpty(),
    recolectarErrores_1.recolectarErrores,
], auth_1.verifyUser);
exports.default = router;
