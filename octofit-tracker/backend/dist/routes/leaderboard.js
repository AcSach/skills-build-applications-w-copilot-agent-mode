"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await models_1.Leaderboard.find({}).lean();
    res.json({ count: leaderboard.length, leaderboard });
});
exports.default = router;
