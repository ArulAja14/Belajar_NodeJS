const errorHandler = require("./middlewares/errorHandler");

const express = require("express");

const logger = require("./middlewares/LoggerMiddleware");

require("./config/database");

const userRoutes = require("./routes/userRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Express berjalan di http://localhost:3000");
});