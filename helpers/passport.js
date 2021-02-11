const Strategy = require("passport-local").Strategy;
const passport = require("passport");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

passport.use(
  new Strategy(async function (username, password, done) {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: "user not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "incorrect password" });
      } else {
        return done(null, user);
      }
    }
  })
);

passport.serializeUser(function (user, done) {
  console.log("running");
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await User.findById(id, (error, user) => {
    done(null, user);
  });
});

module.exports = passport;
