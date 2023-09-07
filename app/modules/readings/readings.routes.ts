import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { upload } from "../../utility/file-upload";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import readingsService from "./readings.service";
import {
    createReadingsValidator,
    createReportValidator,
} from "./readings.validators";

export const ReadingsRouter = Router();

ReadingsRouter.post(
  "/add/:id",
  upload,
  permit([ROLES.AGENT]),
  createReadingsValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.id;
      const images = (req.files as any).map((file: any) => file.path);
      const readings = JSON.parse(req.body.readings);
      const result = await readingsService.createReading(
        parseInt(req.params.id),
        readings,
        images,
        userId
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

ReadingsRouter.get("/:id", permit([ROLES.ADMIN]), async (req, res, next) => {
  try {
    const result = await readingsService.findOneReading(
      parseInt(req.params.id)
    );
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

ReadingsRouter.get(
  "/group/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await readingsService.groupReadingsByDate(
        parseInt(req.params.id)
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

ReadingsRouter.post(
  "/report/:id",
  upload,
  permit([ROLES.AGENT]),
  createReportValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = (req.files as any)[0].path;
      const reason = req.body.reason;
      const result = await readingsService.reportMeter(
        parseInt(req.params.id),
        reason,
        image
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
