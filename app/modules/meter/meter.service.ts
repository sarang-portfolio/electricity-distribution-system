import meterRepo from "./meter.repo";
import { IMeter } from "./meter.types";

const getOne = async (consumerId: string, meterTypeId: string) => {
  try {
    return await meterRepo.getOne(consumerId, meterTypeId);
  } catch (error) {
    throw error;
  }
};

const create = async (data: IMeter) => {
  try {
    return await meterRepo.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (
  consumerId: string,
  meterId: string,
  meterTypeId: string,
  data: IMeter
) => {
  try {
    return await meterRepo.update(consumerId, meterId, meterTypeId, data);
  } catch (error) {
    throw error;
  }
};

export default {
  getOne,
  create,
  update,
};
