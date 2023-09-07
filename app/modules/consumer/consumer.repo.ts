import { Op } from "sequelize";
import { meterModel } from "../meter/meter.schema";
import { meterTypeModel } from "../metertypes/metertypes.schema";
import { consumerModel } from "./consumer.schema";
import { IConsumer } from "./consumer.types";

const getAll = (
  limit?: number,
  offset?: number,
  sortBy?: string,
  orderBy?: string,
  searchBy?: string
) => {
  if (limit && offset === 0 && sortBy && orderBy && searchBy) {
    return consumerModel.findAll({
      limit,
      offset,
      order: [[sortBy, orderBy]],
      where: { name: { [Op.substring]: searchBy } },
    });
  } else if (limit && offset && sortBy && orderBy && searchBy) {
    return consumerModel.findAll({
      limit,
      offset,
      order: [[sortBy, orderBy]],
      where: { name: { [Op.substring]: searchBy } },
    });
  } else {
    return consumerModel.findAll();
  }
};

const getAssignedUsers = (userId: number, meterId: number) =>
  consumerModel.findOne({
    where: { userId },
    include: [
      {
        model: meterModel,
        where: { id: meterId },
      },
    ],
    attributes: [],
  });

const getOne = (id: number) => consumerModel.findOne({ where: { id } });

const create = (consumer: IConsumer) => consumerModel.create({ ...consumer });

const update = (id: number, consumer: any) =>
  consumerModel.update(consumer, { where: { id } });

const remove = (id: number) => consumerModel.destroy({ where: { id } });

const getConsumerDetails = (userId: string) =>
  consumerModel.findAll({
    include: [
      {
        model: meterModel,
        attributes: ["id", "meterStatus", "avgReading"],
        include: [
          {
            model: meterTypeModel,
            attributes: [
              "id",
              "type",
              "pricePerUnit",
              "requiredNumberOfReadings",
              "faultTolerance",
            ],
          },
        ],
      },
    ],
    attributes: ["id", "name", "address", "email"],
    where: { userId },
  });

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  getConsumerDetails,
  getAssignedUsers,
};
