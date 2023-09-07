import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import metertypesService from "./metertypes.service";
import { IMeterType } from "./metertypes.types";
import {
    createMeterTypesValidator,
    updateMeterValidator,
} from "./metertypes.validators";

export const MeterTypeRouter = Router();

MeterTypeRouter.get("/", permit([ROLES.ADMIN]), async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    const sortBy = req.query.sortBy as string;
    const orderBy = req.query.orderBy as string;
    const searchBy = req.query.searchBy as string;
    const result = await metertypesService.getAllMeterTypes(
      limit,
      offset,
      sortBy,
      orderBy,
      searchBy
    );
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

MeterTypeRouter.get("/:id", permit([ROLES.ADMIN]), async (req, res, next) => {
  try {
    const result = await metertypesService.getOneMeterType(
      parseInt(req.params.id)
    );
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

MeterTypeRouter.post(
  "/add",
  permit([ROLES.ADMIN]),
  createMeterTypesValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await metertypesService.createMeterType(
        req.body as IMeterType
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

MeterTypeRouter.put(
  "/update/:id",
  permit([ROLES.ADMIN]),
  updateMeterValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await metertypesService.updateMeterType(
        parseInt(req.params.id),
        req.body as IMeterType
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

MeterTypeRouter.delete(
  "/delete/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await metertypesService.removeMeterType(
        parseInt(req.params.id)
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
