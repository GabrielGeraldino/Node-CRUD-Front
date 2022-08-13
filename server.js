var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(cors);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE", "PUT", "POST", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin-X-Requested-With, Content-Type, Accept"
  );
});

app.use(express.static("www"));
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
