const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/shoe-routes");
const testRouter = require("./routes/user-routes");
const cors = require("cors");
const app = express();
const validateToken = require("./middleware/tokenValidation");

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/shoes", validateToken, router); // localhost:5000/shoes
app.use("/auth", testRouter);

mongoose
    .connect(
        "mongodb+srv://mikolaj123:mikolaj123@cluster0.egoazmu.mongodb.net/"
    )
    .then(() => console.log("Connected To Database"))
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => console.log(err));
