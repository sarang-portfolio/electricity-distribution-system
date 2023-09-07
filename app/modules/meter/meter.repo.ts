import { meterModel } from "./meter.schema";
import { IMeter } from "./meter.types";

const getOne = (consumerId: string, meterTypeId: string) =>
  meterModel.findOne({
    where: {
      consumerId,
      meterTypeId,
    },
  });

const create = (data: IMeter) => meterModel.create({ ...data });

const update = (
  consumerId: string,
  meterId: string,
  meterTypeId: string,
  data: IMeter
) =>
  meterModel.update(
    { ...data },
    {
      where: {
        id: meterId,
        consumerId,
        meterTypeId,
      },
    }
  );

export default {
  getOne,
  create,
  update,
};
