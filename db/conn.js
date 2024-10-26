// Requring mongoose
const mongoose = require("mongoose");

// Connecting with dbs
const connectDbs = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.mongoDbURI}/Store`);

    console.log(`MongoDB Connection: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    // Existing
    process.exit(1);
  }
};
module.exports = connectDbs;
