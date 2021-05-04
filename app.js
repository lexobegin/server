const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require('./config');

// Load routings
const userRouters = require("./routers/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
// ....

// Router Basic
app.use(`/api/${API_VERSION}`, userRouters);

module.exports = app;