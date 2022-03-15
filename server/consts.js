const { networkInterfaces } = require("os");


let ipAddress = networkInterfaces()['Wi-Fi'] ? networkInterfaces()['Wi-Fi'][1].address : null;

if (ipAddress) {
    console.log(ipAddress);
} else {
    console.log("You are not on Wi-Fi!");
}


const ROUTES = ['auth', 'movies', 'users'];
const WHITELIST = ['http://localhost:3000', `http://${ipAddress}:3000`];

module.exports = { ROUTES, WHITELIST };