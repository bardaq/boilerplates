import { Router } from "express";

import userController from "./users.controller";
import {
  validateBodyId,
  validateBodyEmail,
  validateBodyPhone,
  validateParamId,
  validateBodyEmailOptional,
  validateBodyPhoneOptional,
} from "./users.validation";
import { handleValidationErrorsMiddlware } from "@/common/validation";

const usersRouter = Router();

usersRouter.post(
  "/",
  [validateBodyEmail, validateBodyPhone],
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

usersRouter.put(
  "/",
  [validateBodyId, validateBodyEmail, validateBodyPhone],
  handleValidationErrorsMiddlware,
  userController.update
);

usersRouter.patch(
  "/",
  [validateBodyId, validateBodyEmailOptional, validateBodyPhoneOptional],
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
