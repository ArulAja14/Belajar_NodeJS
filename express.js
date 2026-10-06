const express = require("express");

const logger = require("./middlewares/LoggerMiddleware");

require("./config/database");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.listen(3000, () => {
    console.log("Express berjalan di http://localhost:3000");
});