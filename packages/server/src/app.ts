import expess, { Router } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import usersRouter from "./users";

const app = expess();

app.use(expess.json());
app.use(expess.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

const mainRouter = Router();
/**
 * Add new routers to the mainRouter
 */
mainRouter.use("/users", usersRouter);

app.use("/api", mainRouter);

app.get("/api/status", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
