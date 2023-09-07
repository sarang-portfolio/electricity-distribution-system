import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import billService from "./bill.service";
import { createBillValidator } from "./bill.validators";

export const BillRouter = Router();

BillRouter.post(
  "/generate-bill",
  permit([ROLES.ADMIN]),
  createBillValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const meterId = parseInt(req.headers.meterid as string);
      const consumerId = parseInt(req.headers.consumerid as string);
      const bill = await billService.getBill(
        meterId,
        consumerId,
        req.body.discount
      );
      res.send(new ResponseHandler(bill));
    } catch (err) {
      next(err);
    }
  }
);

BillRouter.get(
  "/consumer-bill/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const bill = await billService.getConsumerBillDetails(
        parseInt(req.params.id)
      );
      res.send(new ResponseHandler(bill));
    } catch (err) {
      next(err);
    }
  }
);

BillRouter.get("/revenue", permit([ROLES.ADMIN]), async (req, res, next) => {
  try {
    const startDate = new Date(req.query.startDate as string);
    const endDate = new Date(req.query.endDate as string);
    const consumerId = parseInt(req.query.consumerId as string);
    const revenue = await billService.revenueOverTime(
      startDate,
      endDate,
      consumerId
    );
    res.send(new ResponseHandler(revenue));
  } catch (err) {
    next(err);
  }
});

BillRouter.get(
  "/total-bill/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const totalBill = await billService.calculateTotalBill(
        parseInt(req.params.id)
      );
      res.send(new ResponseHandler(totalBill));
    } catch (err) {
      next(err);
    }
  }
);
