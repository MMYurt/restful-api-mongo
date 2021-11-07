const express = require("express");
const { check, validationResult } = require("express-validator");
const app = express();

const query = require("./query.js");

app.use(express.json()); //Body Parser

app.post(
  "/getData",
  [
    //Body Validation
    check("startDate").isDate().withMessage("Invalid startDate. You must pass a valid date (YYY-MM-DD) "),
    check("endDate").isDate().withMessage("Invalid endDate. You must pass a valid date (YYY-MM-DD) "),
    check("minCount").isInt().withMessage("Invalid minCount. You must pass a valid number"),
    check("maxCount").isInt().withMessage("Invalid maxCount. You must pass a valid number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ code: "4", msg: (errors.array().map(x => x.msg)) });    //Used map as there may be more than one invalid value
    } 
    query(req)
      .then((result) => {
        res.json({ code: "0", msg: "Success", records: result });
      })
      .catch((err) => {
        res.status(503).json({code: "3", msg: `${err.code}: ${err.codeName}`})    //MongoDB related errors
      });
  }
);

app.post("*", (req, res) => {
  //Closing all endpoints except /getData
  res
    .status(404)
    .json({ code: "1", msg: `Can't find ${req.originalUrl} on this server!` });
});

app.all("*", (req, res) => {
  //Closing all methods except POST
  res.status(405).json({ code: "2", msg: "Method Not Allowed!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})

app.use(function (error, req, res, next) { //For all unexpected errors
  res.status(500).json({code: "5", msg: "Unexpected error!"})
  next();
});

module.exports = app