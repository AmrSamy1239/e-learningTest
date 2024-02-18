import express, { Response, Request } from "express";
import cors from "cors";
import routerLogin from "./src/routes/loginRoute";
import routerRegister from "./src/routes/registerRoute";
import expressSession from "./src/config/sessionsConfig";
import passport from "passport";
import "./src/config/passportConfig";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(expressSession);

app.use(passport.session());
app.use(passport.initialize());

app.use(routerRegister);
app.use(routerLogin);

app.get("/", (_req: Request, res: Response): void => {
  res.send("Hello guys!!");
});

// Starting the express server
app.listen(PORT, (): void => {
  console.log(`The server is running on PORT: ${PORT}`);
});
