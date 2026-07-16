"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json({ count: teams.length, teams });
});
router.post('/', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
exports.default = router;
