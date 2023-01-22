// database odm package
const mongoose = require("mongoose");

// modules
const config = require(`../config/db_config.js`);

// connect

(async () => {
  try {
    await mongoose
      .connect(config.dbURI(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(
        () => {
          console.info(`Connected to database`);
        },
        (error) => {
          console.error(`Connection error: ${error.stack}`);
        }
      );
  } catch (error) {
    console.log("error");
    console.log(error);
  }
})();

// schema and models
require("./account");
require("./contact");
