import expess from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import usersRouter from "./users";
import logger from "./common/logger";

const app = expess();

app.use(expess.json());
app.use(expess.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/users", usersRouter);

app.get("/status", (req, res) => {
  logger.info("usersRouter");
  res.json({ status: "OK" });
});

export default app;
