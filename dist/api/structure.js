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
const express_1 = require("express");
const category_1 = __importDefault(require("../models/category"));
const rollperson_1 = __importDefault(require("../models/rollperson"));
const account_1 = __importDefault(require("../models/account"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).end();
    try {
        const categories = yield category_1.default.find({ person: req.user._id }).exec();
        const rollpeople = yield rollperson_1.default.find({ person: req.user._id }).exec();
        const accounts = yield account_1.default.find({ person: req.user._id }).exec();
        res.status(200).json({ categories, rollpeople, accounts });
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
router.get('/category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).end();
    try {
        const categories = yield category_1.default.find({ person: req.user._id }).exec();
        res.status(200).json(categories);
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
router.post('/category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).end();
    if (!req.body.name)
        return res.status(400).end();
    try {
        const category = new category_1.default({ person: req.user._id, name: req.body.name });
        yield category.save();
        res.status(201).end();
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
router.get('/rollperson', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).end();
    try {
        const rollpeople = yield rollperson_1.default.find({ person: req.user._id }).exec();
        res.status(200).json(rollpeople);
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
router.post('/rollperson', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).end();
    if (!req.body.name)
        return res.status(400).end();
    try {
        const rollperson = new rollperson_1.default({ person: req.user._id, name: req.body.name });
        yield rollperson.save();
        res.status(201).end();
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
router.get('/account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).end();
    try {
        const accounts = yield account_1.default.find({ person: req.user }).exec();
        res.status(200).json(accounts);
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
router.post('/account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).end();
    if (!req.body.name)
        return res.status(400).end();
    try {
        const account = new account_1.default({ person: req.user._id, name: req.body.name });
        yield account.save();
        res.status(201).end();
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
exports.default = router;
