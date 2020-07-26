import { sharedFunc } from "@monorepo/shared";
import expess from "express";

const app = expess();

app.get("/", (req, res) => {
  const something = sharedFunc(1, 2);
  res.send("Hello World! " + something);
});

const server = app;

export default server;
