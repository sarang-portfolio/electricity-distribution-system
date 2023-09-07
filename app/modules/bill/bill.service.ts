import billRepo from "./bill.repo";

const getBill = async (
  meterId: number,
  consumerId: number,
  discount: number
) => {
  try {
    const meter = await billRepo.meterDetails(meterId);
    console.log(meter);
    if (meter) {
      const bill = await billRepo.generateBill(meterId, consumerId, discount);
      return bill;
    } else {
      throw "Meter not found";
    }
  } catch (err) {
    throw err;
  }
};

const getConsumerBillDetails = async (consumerId: number) => {
  try {
    return await billRepo.getConsumerBill(consumerId);
  } catch (error) {
    throw error;
  }
};

const revenueOverTime = async (
  startDate: Date,
  endDate: Date,
  consumerId: number
) => {
  try {
    return await billRepo.revenueOverTime(startDate, endDate, consumerId);
  } catch (error) {
    throw error;
  }
};

const calculateTotalBill = async (consumerId: number) => {
  try {
    return await billRepo.calculateTotalBill(consumerId);
  } catch (error) {
    throw error;
  }
};

export default {
  getBill,
  getConsumerBillDetails,
  revenueOverTime,
  calculateTotalBill,
};
