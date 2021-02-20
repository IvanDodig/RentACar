const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
   const token = req.cookies.jwt;

   // check if token exists
   if (token) {
      console.log(token);
      jwt.verify(token, "loginsecret", (err, decodedToken) => {
         if (err) {
            console.log(err.message);
            res.redirect("/prijava");
         } else {
            console.log(decodedToken);
            next();
         }
      });
   } else {
      console.log(req);
      res.redirect("/prijava");
   }
};

const checkUser = (req, res, next) => {
   const token = req.cookies.jwt;

   if (token) {
      jwt.verify(token, "loginsecret", async (err, decodedToken) => {
         if (err) {
            console.log(err.message);
            res.locals.user = null;
            next();
         } else {
            console.log(decodedToken);
            res.cookie("jwt", token, { maxAge: 1 * 1 * 15 * 60 * 1000 });
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            next();
         }
      });
   } else {
      res.locals.user = null;
      next();
   }
};

module.exports = { requireAuth, checkUser };
