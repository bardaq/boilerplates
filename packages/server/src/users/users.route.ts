import { Router } from "express";

import userController from "./users.controller";
import {
  validateBodyId,
  validateBodyEmail,
  validateBodyPhone,
  validateParamId,
} from "./users.validation";
import { handleValidationErrorsMiddlware } from "@/common/validation";

const usersRouter = Router();

usersRouter.post(
  "/",
  [validateBodyId, validateBodyEmail, validateBodyPhone],
  handleValidationErrorsMiddlware,
  userController.create
);

usersRouter.get("/", userController.getAll);

usersRouter.get(
  "/:id",
  [validateParamId],
  handleValidationErrorsMiddlware,
  userController.getById
);

usersRouter.patch(
  "/",
  [validateBodyId, validateBodyEmail, validateBodyPhone],
  handleValidationErrorsMiddlware,
  userController.update
);

usersRouter.delete(
  "/:id",
  [validateParamId],
  handleValidationErrorsMiddlware,
  userController.remove
);

export default usersRouter;
