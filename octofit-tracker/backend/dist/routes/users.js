"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json({ count: users.length, users });
});
router.post('/', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
exports.default = router;
