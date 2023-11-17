import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import GitHubStrategy from "passport-github2";

import { usersService, cartsService } from "../services/index.js";
import authService from "../services/authService.js";
import config from "./config.js";

const initializePassportStrategies = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName } = req.body;
          if (!firstName || !lastName)
            return done(null, false, { message: "Incomplete values" });

          const exists = await usersService.getUserBy({ email });
          if (exists)
            return done(null, false, { message: "User already exists" });

          const hashedPassword = await authService.createHash(password);

          const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
          };

          let cart;
          if (req.cookies["cart"]) {
            cart = req.cookies["cart"];
          } else {
            const cartResult = await cartsService.createCart();
            cart = cartResult.id;
          }
          newUser.cart = cart;

          const result = await usersService.createUser(newUser);
          return done(null, result);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", session: false },
      async (email, password, done) => {
        try {
          if (
            email === config.app.ADMIN_EMAIL &&
            password === config.app.ADMIN_PASSWORD
          ) {
            const adminUser = {
              role: "admin",
              id: "0",
              firstName: "admin",
            };
            return done(null, adminUser);
          }

          const user = await usersService.getUserBy({ email });
          if (!user)
            return done(null, false, { message: "Invalid Credentials" });

          const isValidPassword = await authService.validatePassword(
            password,
            user.password
          );
          if (!isValidPassword)
            return done(null, false, { message: "Invalid Credentials" });
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          authService.extractAuthToken,
        ]),
        secretOrKey: "jwtSecret",
      },
      async (payload, done) => {
        return done(null, payload);
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.4137e4f2dd3e6616",
        clientSecret: "353ae059b1ff420033c685f1ab84e3c1a90ff3cc",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          let user = await usersService.getUserBy({
            email: profile._json.email,
          });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: "",
              email: profile._json.email,
              password: "",
              admin: false,
            };
            let result = await usersService.createUser(newUser);
            return done(null, result);
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default initializePassportStrategies;
