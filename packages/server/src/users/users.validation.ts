import { body, param } from "express-validator";

export const validateParamId = param("id").exists().bail().isLength({ min: 6 });

export const validateBodyId = body("id").optional().isLength({ min: 6 });

export const validateBodyEmail = body("email").isEmail();

export const validateBodyPhone = body("phone").custom((val) => {
  if (!val.test(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g)) {
    return Promise.reject("invalid phone");
  }
});
