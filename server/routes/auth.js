const express = require('express');
const router = express.Router();
const db = require('../db/db')
const authMiddleware = require('../middleware')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    const { password } = req.body;

    const user = await db.getUser(req.body.email);

    if (user) {
        return res.sendStatus(400);
    } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = { ...req.body, password: hashedPassword };

        const insertResult = await db.insertUser(userData);

        req.session.user = {
            id: insertResult.id,
            email: insertResult.email,
        }

        return res.sendStatus(201);
    }
})

router.post('/login', async (req, res) => {
    const user = await db.getUser(req.body.email);

    if (!user) {
        return res.sendStatus(400);
    } else {
        let passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCheck) {
            return res.sendStatus(400);
        } else {
            req.session.user = {
                id: user.id,
                email: user.email
            }
        }
    }

    return res.sendStatus(200);
})

router.get('/logout', authMiddleware, async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.sendStatus(500);
        }
    })
    return res.sendStatus(200);
})

module.exports = router;