require('dotenv').config();
const express = require('express');
const cors = require("cors");
const db = require("./db/db");
const session = require('express-session');
const { ROUTES } = require('./consts')
const { WHITELIST } = require('./consts')

// creating app
const app = express();

// creating DB tables

db.createTables()
    .then()
    .catch((err) => console.log(err));

// middlewares

// json parser
app.use(express.json());

// cross-origin resource sharing
app.use(
    cors({
        origin: function (origin, callback) {
            if (WHITELIST.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                // Uncomment line below and comment the second one when testing for now
                //callback(null, true);
                console.log(origin);
                callback(new Error("Not allowed by CORS" + ` ${origin}`));
            }
        },
        credentials: true,
    })
);
// app.use(cors({
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//     origin: ["http://localhost:3000"],
// }));

// session handler
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 20
    }
}))

for (let route of ROUTES) {
    app.use(`/${route}`, require(`./routes/${route}`));
}

// port for listening
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
})