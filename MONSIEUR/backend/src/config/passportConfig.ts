import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { verifyCallBack } from "../services/loginService";
import { loginRepositoryStore } from "../dataAccess/loginRepository";
import { UserRouteType } from "../models/userModel";

const loginRepositoryStoreObj = new loginRepositoryStore();

declare module "passport" {
  interface Authenticator {
    serializeUser<TID>(
      fn: (user: UserRouteType, done: (err: any, id?: TID) => void) => void
    ): void;
  }
}

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const strategy = new LocalStrategy(customFields, verifyCallBack);

passport.use("local", strategy);

passport.serializeUser(
  (
    user: UserRouteType,
    done: (error: any, user?: any, options?: any) => void
  ) => {
    done(null, user.id);
  }
);

passport.deserializeUser(
  async (
    userId: string,
    done: (err: any, user?: any | false | null) => void
  ) => {
    try {
      const IdExist = loginRepositoryStoreObj.showId(userId);
      if (IdExist) {
        done(null, IdExist);
      } else {
        done(new Error("User not found"));
      }
    } catch (error) {
      done(error);
    }
  }
);
