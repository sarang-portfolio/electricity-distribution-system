import { NextFunction, Request, Response, Router } from "express";
import { permit, verifyToken } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import { authConstants } from "./auth.constants";
import authService from "./auth.service";
import { createUserValidator, loginValidator } from "./auth.validators";

export const AuthRouter = Router();

AuthRouter.post(
  "/login",
  loginValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await authService.login(req.body);
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

AuthRouter.post(
  "/create-user",
  permit([ROLES.ADMIN]),
  createUserValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Response = await authService.createUser(req.body);
      res.send(new ResponseHandler(Response));
    } catch (error) {
      next(error);
    }
  }
);

AuthRouter.put(
  "/change-password",
  permit([ROLES.ADMIN, ROLES.AGENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { newPassword, oldPassword } = req.body;
      const response = await authService.resetPassword(
        res.locals.user.id,
        newPassword,
        oldPassword
      );
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

AuthRouter.put(
  "/reset-password/:id",
  permit([ROLES.ADMIN, ROLES.AGENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = verifyToken(req.params.id) as string;
      const response = await authService.resetPassword(
        id,
        req.body.newPassword
      );
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

AuthRouter.post(
  "/forgot-password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await authService.forgotPassword(req.body.email);
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

AuthRouter.post(
  "/logout",
  permit([ROLES.ADMIN, ROLES.AGENT]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(new ResponseHandler(authConstants.LOGGED_OUT));
    } catch (error) {
      next(error);
    }
  }
);
