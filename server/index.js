const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose")
const path = require("path");

const api = require("./api");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Step 1 DB connection
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Data parsing

app.use(express.json({limit: '100mb'}));
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(express.urlencoded({ limit: "100mb", extended: false }));

// Step 3: Initialization
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Step 4: HTTP request logger
app.use(morgan("tiny"));

// Step 5: API Routes
app.use("/api", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
