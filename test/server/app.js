"use strict";
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "html")));
app.use("/bulma-a11y", express.static(path.join(__dirname, "..", "..")));
app.use(function (req, _res, next) {
    console.log(req.url);
    next(createError(404));
});
app.use(function (err, _req, res, _next) {
    res.status(err.status || 500);
    res.end();
});
module.exports = app;
