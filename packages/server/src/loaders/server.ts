import expess, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import usersRouter from "@/users";

const server = expess();

server.use(cors());
server.use(expess.json());
server.use(expess.urlencoded({ extended: true }));
server.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  server.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  server.use(helmet());
}

const mainRouter = Router();
/**
 * Add new routers to the mainRouter
 */
mainRouter.use("/users", usersRouter);

server.use("/api", mainRouter);

server.get("/api/status", (req, res) => {
  res.json({ status: "OK" });
});

export default server;
