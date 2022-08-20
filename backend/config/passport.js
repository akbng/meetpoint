const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const path = require("path");
const fs = require("fs");

const { User } = require("../models/User");

const pathToPubKey = path.resolve(__dirname, "../public.pem");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const initializePassport = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      // Since we are here, the JWT is valid!
      // We will assign the `sub` property on the JWT to the database ID of user
      try {
        const user = await User.findById(jwt_payload.sub);
        // hide the sensitive information from the response
        user.hashed_password = undefined;
        user.salt = undefined;

        if (!user) return done(null, false);
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    })
  );
};

module.exports = initializePassport;
