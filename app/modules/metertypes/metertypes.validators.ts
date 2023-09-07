import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const createMeterTypesValidator = [
  body("type").isString().notEmpty().withMessage("Type is required!"),
  body("pricePerUnit")
    .isInt()
    .notEmpty()
    .withMessage("Price Per Unit is required!"),
  body("requiredNumberOfReadings")
    .isInt()
    .notEmpty()
    .withMessage("Required Number Of Readings is required!"),
  body("faultTolerance")
    .isInt()
    .notEmpty()
    .withMessage("Fault Tolerance is required!"),
  validate,
];

export const updateMeterValidator = [
  param("id").isInt().notEmpty().withMessage("Id is required!"),
  body("type").isString().notEmpty().withMessage("Type is required!"),
  body("pricePerUnit")
    .isInt()
    .notEmpty()
    .withMessage("Price Per Unit is required!"),
  body("requiredNumberOfReadings")
    .isInt()
    .notEmpty()
    .withMessage("Required Number Of Readings is required!"),
  body("faultTolerance")
    .isInt()
    .notEmpty()
    .withMessage("Fault Tolerance is required!"),
  validate,
];
