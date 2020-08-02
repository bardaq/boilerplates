import { Router } from "express";

import userController from "./users.controller";
import {
  validateBodyId,
  validateBodyEmail,
  validateBodyPhone,
  validateParamId,
} from "./users.validation";
import { handleValidationErrorsMiddlware } from "common/validation";

const router = Router();

router.post(
  "/",
  [validateBodyId, validateBodyEmail, validateBodyPhone],
  handleValidationErrorsMiddlware,
  userController.create
);

router.get("/", userController.getAll);

router.get(
  "/:id",
  [validateParamId],
  handleValidationErrorsMiddlware,
  userController.getById
);

router.patch(
  "/",
  [validateBodyId, validateBodyEmail, validateBodyPhone],
  handleValidationErrorsMiddlware,
  userController.update
);

router.delete(
  "/:id",
  [validateParamId],
  handleValidationErrorsMiddlware,
  userController.remove
);
