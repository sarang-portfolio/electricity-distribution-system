import { Op } from "sequelize";
import { meterTypeModel } from "./metertypes.schema";
import { IMeterType } from "./metertypes.types";

const getAll = (
  limit?: number,
  offset?: number,
  sortBy?: string,
  orderBy?: string,
  searchBy?: string
) => {
  if (limit && offset === 0 && sortBy && orderBy && searchBy) {
    return meterTypeModel.findAll({
      limit,
      offset,
      order: [[sortBy, orderBy]],
      where: { type: { [Op.substring]: searchBy } },
    });
  } else if (limit && offset && sortBy && orderBy && searchBy) {
    return meterTypeModel.findAll({
      limit,
      offset,
      order: [[sortBy, orderBy]],
      where: { type: { [Op.substring]: searchBy } },
    });
  } else {
    return meterTypeModel.findAll();
  }
};

const getOne = (id: number) => meterTypeModel.findOne({ where: { id } });

const create = (meterType: IMeterType) =>
  meterTypeModel.create({ ...meterType });

const update = (id: number, meterType: IMeterType) =>
  meterTypeModel.update(meterType, { where: { id } });

const remove = (id: number) => meterTypeModel.destroy({ where: { id } });

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};
