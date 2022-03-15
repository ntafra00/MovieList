const express = require('express');
const router = express.Router();
const db = require('../db/db')
const authMiddleware = require('../middleware')
const bcrypt = require('bcrypt')

router.get('/', authMiddleware, async (req, res) => {
    const userEmail = req.session.user.email;
    let user = await db.getUser(userEmail);

    if (!user) {
        return res.sendStatus(404);
    }

    res.status(200).send({
        message: "Success",
        data: user
    })
})

router.put('/', authMiddleware, async (req, res) => {
    const userEmail = req.session.user.email;
    //const { password } = req.body;

    const user = await db.getUser(userEmail);
    if (!user) {
        return res.sendStatus(404);
    }

    if (req.body.email) {
        const userExists = await db.getUser(req.body.email);
        if (userExists) {
            return res.sendStatus(400);
        }
    }

    //const newData = { ...user, ...req.body };

    const finalData = {};

    if (req.body.email !== null && req.body.email !== '') {
        finalData.email = req.body.email;
    }

    if (req.body.username !== null && req.body.username !== '') {
        finalData.username = req.body.username;
    }

    const newData = { ...user, ...finalData };

    if (req.body.password !== null && req.body.password !== '') {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        newData.password = hashedPassword;
    }

    await db.updateUser(userEmail, newData);

    res.sendStatus(200);
})

router.delete('/', authMiddleware, async (req, res) => {
    const userEmail = req.session.user.email;

    req.session.destroy(err => {
        if (err) {
            return res.sendStatus(500);
        }
    })

    const deleted = await db.deleteUser(userEmail);

    if (!deleted) {
        return res.sendStatus(404);
    }

    return res.status(200).send({
        message: "Success"
    })
})

module.exports = router;