import { Op } from "sequelize";
import { sequelize } from "../../utility/sequelize";
import { consumerModel } from "../consumer/consumer.schema";
import { meterModel } from "../meter/meter.schema";
import { meterTypeModel } from "../metertypes/metertypes.schema";
import { billModel } from "./bill.schema";

const meterDetails: any = (meterId: number) =>
  meterModel.findOne({
    where: {
      id: meterId,
      [Op.and]: [{ meterStatus: "WORKING" }, { avgReading: { [Op.gt]: 0 } }],
    },
    include: [
      {
        model: meterTypeModel,
        attributes: ["pricePerUnit"],
      },
    ],
    attributes: ["avgReading"],
  });

const generateBill = async (
  meterId: number,
  consumerId: number,
  discount: number
) => {
  const meter = await meterDetails(meterId);
  return billModel.create({
    meterId,
    consumerId,
    totalReading: meter.avgReading,
    totalAmount:
      meter.avgReading * parseInt(meter["metertype.pricePerUnit"]) -
      (meter.avgReading *
        parseInt(meter["metertype.pricePerUnit"]) *
        discount) /
        100,
    discount: discount,
    dueDate: new Date().setDate(new Date().getDate() + 30),
  });
};

const getConsumerBill = (consumerId: number) =>
  consumerModel.findOne({
    where: {
      id: consumerId,
    },
    include: [
      {
        model: meterModel,
        attributes: ["id", "avgReading", "meterStatus"],
        include: [
          {
            model: meterTypeModel,
            attributes: ["type", "pricePerUnit"],
          },
          {
            model: billModel,
            attributes: [
              "id",
              "totalReading",
              "totalAmount",
              "discount",
              "dueDate",
              "date",
            ],
          },
        ],
      },
    ],
    attributes: ["id", "name", "email", "address"],
  });

const revenueOverTime = (startDate: Date, endDate: Date, consumerId: number) =>
  billModel.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      consumerId,
    },
    attributes: [
      [sequelize.fn("sum", sequelize.col("totalAmount")), "revenue"],
      [sequelize.fn("MAX", sequelize.col("date")), "date"],
    ],
  });

const calculateTotalBill = (consumerId: number) =>
  billModel.findAll({
    where: {
      consumerId,
    },
    attributes: [
      [sequelize.fn("sum", sequelize.col("totalAmount")), "totalBill"],
    ],
  });

export default {
  generateBill,
  meterDetails,
  getConsumerBill,
  revenueOverTime,
  calculateTotalBill,
};
