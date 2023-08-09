"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactions_1 = __importDefault(require("./transactions"));
const structure_1 = __importDefault(require("./structure"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
router.use('/transactions', transactions_1.default);
router.use('/structure', structure_1.default);
exports.default = router;
