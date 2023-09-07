import { sequelize } from "../../utility/sequelize";
import { meterHistoryModel } from "./meterhistory.schema";

const faultyMetersOverTime = () =>
  meterHistoryModel.findAll({
    where: {
      meterStatus: "FAULTY",
    },
    attributes: [
      [sequelize.fn("date", sequelize.col("createdAt")), "date"],
      [sequelize.fn("count", sequelize.col("meterId")), "count"],
    ],
    group: ["date"],
  });

export const addMeterHistory = (meterId: number, meterStatus: string) =>
  meterHistoryModel.create({
    meterId,
    meterStatus,
  });

export default {
  faultyMetersOverTime,
  addMeterHistory,
};
