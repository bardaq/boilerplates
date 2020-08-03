import { body, param } from "express-validator";

export const validateParamId = param("id").exists().bail().isLength({ min: 6 });

export const validateBodyId = body("id").exists().bail().isLength({ min: 6 });

export const validateBodyEmail = body("email").isEmail();

export const validateBodyEmailOptional = body("email").optional().isEmail();

export const sanitizePhone = (phone: string) => {
  const normalizedPhone = phone.replace(/\s|-|\(|\)|\+/g, "");
  return normalizedPhone;
};

export const validateBodyPhone = body("phone")
  .exists()
  .bail()
  .customSanitizer(sanitizePhone)
  .custom((phone: string) => {
    const validationRegex = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g;
    return phone && validationRegex.test(phone)
      ? true
      : Promise.reject("invalid phone");
  });

export const validateBodyPhoneOptional = body("phone")
  .optional()
  .customSanitizer((phone: string) => {
    const normalizedPhone = phone.replace(/\s|-|\(|\)|\+/g, "");
    return normalizedPhone;
  })
  .custom((phone: string) => {
    const validationRegex = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g;
    return phone && validationRegex.test(phone)
      ? true
      : Promise.reject("invalid phone");
  });
