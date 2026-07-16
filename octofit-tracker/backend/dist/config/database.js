"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    try {
        await mongoose_1.default.connect(uri);
        console.log(`Connected to MongoDB database: ${uri}`);
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}
