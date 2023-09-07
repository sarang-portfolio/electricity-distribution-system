import { Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import meterService from "./meterhistory.service";

export const MeterHistoryRouter = Router();

MeterHistoryRouter.get(
  "/faulty-meters-over-time",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await meterService.faultyMetersOverTime();
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
