const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// uncaughtException

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaughtException");
  process.exit(1);
});

// config
dotenv.config({ path: "backend/config/config.env" });

// connect to database
connectDatabase();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Server is running on port " + process.env.port);
});

// unhandled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
