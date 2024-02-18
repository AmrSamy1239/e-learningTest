import session from "express-session";
import pgSession from "connect-pg-simple";
import database from "./databaseConfig";

const expressSessionStore = pgSession(session);
const sessionSecret: string = String(process.env.SESSION_SECRET);

// Set session configuration
const expressSession = session({
  store: new expressSessionStore({
    pool: database,
    tableName: "session",
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
});

export default expressSession;
