const express = require("express");
const routes = require("./routes/router");
require("dotenv").config();
const jwt = require('jsonwebtoken');

require("./database");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3001);
