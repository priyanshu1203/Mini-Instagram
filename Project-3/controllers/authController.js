const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });

    res.redirect("/login");
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.redirect("/login");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.redirect("/login");

    const token = jwt.sign(
        { _id: user._id, username: user.username },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};