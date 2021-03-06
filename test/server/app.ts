import * as createError from "http-errors";
import * as express from "express";
import * as path from "path";


/*
 * INITIALIZE APP
 */


const app = express();

app.use(express.static(path.join(__dirname, "html")));

app.use("/bulma-a11y", express.static(path.join(__dirname, "..", "..")));


// Catch 404 and forward to error handler
app.use(function(req, _res, next) {
  console.log(req.url);
  next(createError(404));
});


// Error handler
app.use(function(err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) {
  res.status(err.status || 500);
  res.end();
});


export = app;
