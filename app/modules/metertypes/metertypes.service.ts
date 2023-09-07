import { MeterTypeConstants } from "./metertypes.constants";
import metertypesRepo from "./metertypes.repo";
import { IMeterType } from "./metertypes.types";

const getAllMeterTypes = async (
  limit?: number,
  offset?: number,
  sortBy?: string,
  orderBy?: string,
  searchBy?: string
) => {
  try {
    return await metertypesRepo.getAll(
      limit,
      offset,
      sortBy,
      orderBy,
      searchBy
    );
  } catch (err) {
    throw MeterTypeConstants.NOT_FOUND;
  }
};

const getOneMeterType = async (id: number) => {
  try {
    return await metertypesRepo.getOne(id);
  } catch (err) {
    throw MeterTypeConstants.NOT_FOUND;
  }
};

const createMeterType = async (meterType: IMeterType) => {
  try {
    await metertypesRepo.create(meterType);
    return MeterTypeConstants.METER_ADDED;
  } catch (err) {
    throw MeterTypeConstants.METER_NOT_ADDED;
  }
};

const updateMeterType = async (id: number, meterType: IMeterType) => {
  try {
    await metertypesRepo.update(id, meterType);
    return MeterTypeConstants.METER_UPDATED;
  } catch (err) {
    throw MeterTypeConstants.METER_NOT_UPDATED;
  }
};

const removeMeterType = async (id: number) => {
  try {
    await metertypesRepo.remove(id);
    return MeterTypeConstants.METER_DELETED;
  } catch (err) {
    throw MeterTypeConstants.METER_NOT_DELETED;
  }
};

export default {
  getAllMeterTypes,
  getOneMeterType,
  createMeterType,
  updateMeterType,
  removeMeterType,
};
