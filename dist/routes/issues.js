"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const issues_1 = require("../controllers/issues");
const ValidarJWT_1 = __importDefault(require("../middlewares/ValidarJWT"));
const validarRol_1 = require("../middlewares/validarRol");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/", [
    ValidarJWT_1.default,
    validarRol_1.isAdmin,
    (0, express_validator_1.check)("title", "El titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("description", "La descripcion es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("priority", "La prioridad es obligatoria").not().isEmpty(),
    recolectarErrores_1.recolectarErrores,
], issues_1.postNewIssue);
exports.default = router;
