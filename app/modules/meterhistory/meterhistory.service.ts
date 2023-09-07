import meterhistoryRepo from "./meterhistory.repo";
import { MeterHistoryConstants } from "./meterhistory.constants";

const faultyMetersOverTime = async () => {
  try {
    return await meterhistoryRepo.faultyMetersOverTime();
  } catch (error) {
    throw MeterHistoryConstants.NOT_FOUND;
  }
};

export default {
  faultyMetersOverTime,
};
