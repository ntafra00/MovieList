require('dotenv').config();
const { urlencoded } = require('express');
const { Pool } = require('pg');

const pool = new Pool();

async function createTables() {

    await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id serial primary key not null,
    email text not null,
    username text not null,
    password text not null)`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS movies(
    id serial primary key not null,
    name text not null,
    year text not null,
    imdb_rate text not null,
    image_url text,
    user_id integer REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE)`);
}

const getUser = async (userEmail) => {
    let res = await pool.query("SELECT * FROM users WHERE email = $1", [userEmail]);
    return res.rowCount ? res.rows[0] : null;
}

const insertUser = async (userData) => {
    let res = await pool.query(
        `INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, email, username`,
        [
            userData.email,
            userData.username,
            userData.password
        ])

    return res.rows[0];
}

const deleteUser = async (userEmail) => {
    let res = await pool.query("DELETE FROM users WHERE email = $1", [userEmail]);

    return res.rowCount === 1;
}

const updateUser = async (userEmail, userData) => {
    let res = await pool.query(
        `UPDATE users SET email = $1, username = $2, password = $3
        WHERE email = $4`,
        [
            userData.email,
            userData.username,
            userData.password,
            userEmail
        ])

    return res.rowCount === 1;
}

const insertMovie = async (userId, movieData) => {
    let res = await pool.query(
        `INSERT INTO movies (name, year, imdb_rate, image_url, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
            movieData.name,
            movieData.year,
            movieData.imdb_rate,
            movieData.image_url,
            userId
        ])

    return res.rows ? res.rows[0] : null;
}

const updateMovie = async (userId, movieData) => {
    let res = await pool.query(
        `UPDATE movies SET name = $1, year = $2, imdb_rate = $3
        WHERE user_id = $4`,
        [
            movieData.name,
            movieData.year,
            movieData.imdb_rate,
            userId
        ])

    return res.rowCount === 1;
}

const deleteMovie = async (movieId) => {
    let res = await pool.query('DELETE FROM movies WHERE id = $1', [movieId]);
    return res.rowCount === 1;
}

const getMovies = async (userId) => {
    let res = await pool.query('SELECT * FROM movies WHERE user_id = $1 ORDER BY id ASC', [userId]);
    return res.rowCount ? res.rows : null;
}

const getMovie = async (movieId) => {
    let res = await pool.query('SELECT * FROM movies WHERE id = $1', [movieId]);
    return res.rowCount ? res.rows[0] : null;
}

const checkForMovie = async (movieName, userId) => {
    let res = await pool.query('SELECT * FROM movies WHERE name = $1 AND user_id = $2', [movieName, userId]);
    return res.rowCount === 1;
}

module.exports = {
    getUser,
    insertUser,
    deleteUser,
    updateUser,
    updateMovie,
    getMovie,
    getMovies,
    deleteMovie,
    insertMovie,
    checkForMovie,
    createTables
};  