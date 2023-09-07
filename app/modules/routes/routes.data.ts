import { IExcludedPaths } from "../../utility/authorize";
import { AuthRouter } from "../auth/auth.routes";
import { BillRouter } from "../bill/bill.routes";
import { MeterRouter } from "../meter/meter.routes";
import { MeterHistoryRouter } from "../meterhistory/meterhistory.routes";
import { MeterTypeRouter } from "../metertypes/metertypes.routes";
import { ReadingsRouter } from "../readings/readings.routes";
import { UserRouter } from "../user/user.routes";
import { Route, Routes } from "./routes.types";

export const routes: Routes = [
  new Route("/auth", AuthRouter),
  new Route("/user", UserRouter),
  new Route("/metertype", MeterTypeRouter),
  new Route("/meter", MeterRouter),
  new Route("/readings", ReadingsRouter),
  new Route("/bill", BillRouter),
  new Route("/meterhistory", MeterHistoryRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "/auth/login", method: "POST" },
  { path: "/auth/reset-password/", method: "PUT" },
  { path: "/auth/signup", method: "POST" },
  { path: "/auth/forgot-password", method: "POST" },
];
