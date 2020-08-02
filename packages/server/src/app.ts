import expess from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "@/common/logger";

import { sharedFunc } from "@monorepo/shared";

const app = expess();

app.use(expess.json());
app.use(expess.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.get("/", (req, res) => {
  const something = sharedFunc(1, 2);
  res.send("Hello World! " + something);
});

const server = app;

export default server;
