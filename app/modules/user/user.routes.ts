import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import consumerService from "../consumer/consumer.service";
import { ROLES } from "../roles/roles.constants";
import userService from "./user.service";
import { IUser } from "./user.types";
import {
    createAssignAgentValidator,
    createUpdateValidator,
} from "./user.validators";

export const UserRouter = Router();

UserRouter.get("/", permit([ROLES.ADMIN]), async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    const sortBy = req.query.sortBy as string;
    const orderBy = req.query.orderBy as string;
    const searchBy = req.query.searchBy as string;
    const result = await userService.getAllUsers(
      limit,
      offset,
      sortBy,
      orderBy,
      searchBy
    );
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

UserRouter.get(
  "/get-all-consumers",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const { limit, offset, sortBy, orderBy, searchBy } = req.query;
      const result = await consumerService.getAllConsumer(
        parseInt(limit as string),
        parseInt(offset as string),
        sortBy as string,
        orderBy as string,
        searchBy as string
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.delete(
  "/delete-user/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

UserRouter.post(
  "/assign-agent",
  permit([ROLES.ADMIN]),
  createAssignAgentValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.assignAgent(req.body);
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.get(
  "/assigned-consumers",
  permit([ROLES.AGENT]),
  async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const result = await userService.getAssignedConsumers(userId);
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.put(
  "/update-user/:id",
  permit([ROLES.ADMIN, ROLES.AGENT]),
  createUpdateValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.updateUser(
        req.params.id,
        req.body as IUser
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

UserRouter.get(
  "get-one-user/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await userService.getUser(req.params.id);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

UserRouter.get(
  "get-one-consumer/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await consumerService.getOneConsumer(parseInt(id));
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.post(
  "/add-consumer",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await consumerService.createConsumer(req.body);
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.put(
  "/update-consumer/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await consumerService.updateConsumer(
        parseInt(req.params.id),
        req.body
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.delete(
  "/delete-consumer/:id",
  permit([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await consumerService.removeConsumer(
        parseInt(req.params.id)
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
