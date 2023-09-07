import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const createBillValidator = [
  body("meterid").isInt().notEmpty().withMessage("Meter Id is required!"),
  body("consumerid").isInt().notEmpty().withMessage("Consumer Id is required!"),
  body("discount").isInt().notEmpty().withMessage("Discount is required!"),
  validate,
];
