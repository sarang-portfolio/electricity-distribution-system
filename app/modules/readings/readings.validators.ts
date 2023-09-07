import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const createReadingsValidator = [
  body("readings").isArray().notEmpty().withMessage("Readings is required!"),
  validate,
];

export const createReportValidator = [
  body("reasong").isString().notEmpty().withMessage("Reason is required!"),
];
