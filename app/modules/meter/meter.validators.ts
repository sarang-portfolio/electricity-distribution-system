import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const createMeterValidator = [
  body("consumerId").isInt().notEmpty().withMessage("Consumer Id is required!"),
  body("meterTypeId")
    .isInt()
    .notEmpty()
    .withMessage("Meter Type Id is required!"),
  validate,
];
