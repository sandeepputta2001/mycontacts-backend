const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

const dotenv = require("dotenv").config();
connectDB();
const app = express();

const port = process.env.PORT || 5000; // process is the core module in js which

app.use(express.json()); //express.json() is a in-built middleware for parsing incoming request body from the client.
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
