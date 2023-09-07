import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import meterService from "./meter.service";
import { IMeter } from "./meter.types";
import { createMeterValidator } from "./meter.validators";

export const MeterRouter = Router();

MeterRouter.post(
  "/add",
  permit([ROLES.ADMIN]),
  createMeterValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IMeter = req.body;
      const result = await meterService.create(data);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);
