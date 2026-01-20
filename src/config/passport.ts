import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../utils/prisma";
import config from "../config";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt_secret,
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          include: { role: true },
        });

        if (!user) {
          return done(null, false);
        }

        return done(null, {
          id: user.id,
          role: user.role.name,
        });
      } catch (err) {
        done(err, false);
      }
    },
  ),
);

export default passport;
