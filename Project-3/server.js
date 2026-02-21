require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db");
const { checkUser } = require("./middleware/authMiddleware");

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(expressLayouts);

app.use(checkUser);


app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


app.set("view engine", "ejs");
app.set("layout", "layout");

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/postRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));