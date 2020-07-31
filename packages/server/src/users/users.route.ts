import { Router } from "express";
import userController from "./users.controller";

const router = Router();

router.post("/", userController.create);

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.patch("/:id", userController.update);

router.delete("/:id", userController.remove);
