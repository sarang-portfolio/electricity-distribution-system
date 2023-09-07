import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const createAssignAgentValidator = [
  body("consumerId").isInt().notEmpty().withMessage("ConsumerId is required!"),
  body("userId").isInt().notEmpty().withMessage("UserId is required!"),
  validate,
];

export const createUpdateValidator = [
  body("username").isString().notEmpty().withMessage("Username is required!"),
  body("email").isEmail().notEmpty().withMessage("Email is required!"),
  validate,
];
