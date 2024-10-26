// Requiring express
const express = require("express");
const app = express();

//Require cors
const cors = require("cors");

// Requiring dot env
const dotEnv = require("dotenv");

// Requirng path
const path = require("path");
// Setting up config
dotEnv.config({ path: "./config/config.env" });

// Updating port
const PORT = process.env.PORT || 3000;

//Connecting with dbs
const connectDB = require("./db/conn");
connectDB();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Static file
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/geo/store", require("./routes/store"));

app.listen(PORT, () =>
  console.log(
    `Your server on ${process.env.mode} mode is running on the PORT: ${PORT}`
  )
);
