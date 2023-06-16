const express = require("express");
const routes = require("./routes/router");
require("dotenv").config();
const cors = require("cors");


require("./database");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  next();
});
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3001);