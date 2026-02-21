const jwt = require("jsonwebtoken");


const checkUser = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            req.user = null;
        }
    } else {
        req.user = null;
    }

    next();
};


const protect = (req, res, next) => {
    if (!req.user) {
        return res.redirect("/login");
    }
    next();
};

module.exports = { checkUser, protect };