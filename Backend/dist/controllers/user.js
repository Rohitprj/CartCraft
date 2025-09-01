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
exports.loginOrSignup = void 0;
const userSchems_1 = __importDefault(require("../models/userSchems"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2d" });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};
const loginOrSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, phone } = req.body;
    try {
        let user = yield userSchems_1.default.findOne({ phone });
        if (!user) {
            user = new userSchems_1.default({ address, phone });
        }
        else {
            user.address = address;
        }
        yield user.save();
        const { accessToken, refreshToken } = generateTokens(user.toObject());
        res.status(200).json({ user, accessToken, refreshToken });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.loginOrSignup = loginOrSignup;
