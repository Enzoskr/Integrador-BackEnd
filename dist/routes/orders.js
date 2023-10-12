"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const ValidarJWT_1 = __importDefault(require("../middlewares/ValidarJWT"));
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const validarVerified_1 = require("../middlewares/validarVerified");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", [ValidarJWT_1.default, recolectarErrores_1.recolectarErrores], orders_1.getOrders);
router.post("/", [
    ValidarJWT_1.default,
    validarVerified_1.isVerified,
    (0, express_validator_1.check)("price", "El precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("total", "El precio total es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails", "los detalles de envío son obligatorios")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("items", "El array de los items es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores,
], orders_1.createOrder);
exports.default = router;
