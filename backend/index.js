const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// configurations
const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

mongoose.connect(process.env.dbURI, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", function (err) {
  console.log(err);
});

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

// routes
require("./routes/routes.config").routesConfig(app);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`running at localhost:${PORT}`);
});
