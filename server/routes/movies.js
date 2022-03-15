const express = require('express');
const router = express.Router();
const db = require('../db/db')
const authMiddleware = require('../middleware')

router.get('/', authMiddleware, async (req, res) => {
    const userId = req.session.user.id;
    const movies = await db.getMovies(userId);
    if (!movies) {
        return res.sendStatus(204);
    }

    res.status(200).send({
        message: "Success",
        data: movies
    })
})

router.post('/', authMiddleware, async (req, res) => {
    const userId = req.session.user.id;
    let checkIfExists = await db.checkForMovie(req.body.name, userId);

    if (checkIfExists) {
        return res.sendStatus(400);
    }

    // if (req.body.image_url === "")
    //     req.body.image_url = "../assets/movie.jpg"

    let newMovie = await db.insertMovie(userId, req.body);
    res.status(201).send({
        message: "Success",
        data: newMovie
    })

    // await db.insertMovie(userId, req.body);

    // res.sendStatus(201);
})

router.put('/:id', authMiddleware, async (req, res) => {
    const userId = req.session.user.id;
    const movieId = req.params;
    let movie = await db.getMovie(movieId);

    if (!movie) {
        return res.sendStatus(404);
    }

    const newData = { ...movie, ...req.body };

    await db.updateMovie(userId, newData);

    res.status(200).send({
        message: "Success"
    })
})

router.delete('/:id', authMiddleware, async (req, res) => {
    const movieId = req.params.id;
    let movie = await db.getMovie(movieId);

    if (!movie) {
        return res.sendStatus(404);
    }

    await db.deleteMovie(movieId);

    res.status(200).send({
        message: "Success"
    })
})

router.get('/:id', authMiddleware, async (req, res) => {
    const movieId = req.params;
    let movie = await db.getMovie(movieId);

    if (!movie) {
        return res.sendStatus(404);
    }

    res.status(200).send({
        message: "Success",
        data: movie
    })
})

module.exports = router;