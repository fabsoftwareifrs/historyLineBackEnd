import JwtStrategy from "passport-jwt";
import ExtractJwt from "passport-jwt";

const JwtStrategyConfig = JwtStrategy.Strategy;
const ExtractJwtConfig = ExtractJwt.ExtractJwt;
import User from "../models/User.js";
import passport from "passport";
var opts = {};
opts.jwtFromRequest = ExtractJwtConfig.fromAuthHeaderAsBearerToken();
opts.secretOrKey =
  process.env.JWT_HASH ||
  "f6f2ea8f45d8a057c9566a33f99474da2e5c6a6604d736121650e2730c6fb0a3";
passport.use(
  new JwtStrategyConfig(opts, async function (jwt_payload, done) {
    const oi = await User.findOne(
      { where: { id: jwt_payload.id } },
      function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    );
  })
);
