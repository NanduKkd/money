"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const api_1 = __importDefault(require("./api"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/money').then(() => {
    console.log('mongodb connection established');
}).catch(e => {
    console.log('mongoose could not establish db connection');
    console.error(e);
});
mongoose_1.default.connection.on('error', e => {
    console.log('mongoose connection: error occured');
    console.error(e);
});
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: false }));
app.get('/', (req, res) => {
    res.end('Hello World! My name is Nandu!');
});
app.use('/api', api_1.default);
app.use(express_1.default.static('public'));
app.listen(3001, () => {
    console.log('app listening on port 3001');
});
