import consumerService from "../consumer/consumer.service";
import { ReadingConstants } from "./readings.constants";
import readingsRepo from "./readings.repo";

const createReading = async (
  meterId: number,
  readings: any,
  images: any,
  userId: number
) => {
  try {
    const consumer: any = await consumerService.getAssignedUsers(
      userId,
      meterId
    );
    consumer.meters.map(async (meter: any) => {
      if (meter.id === meterId) {
        await readingsRepo.createBulkReading(meterId, readings, images);
      }
    });
    return ReadingConstants.READING_ADDED;
  } catch (error) {
    throw error;
  }
};

const findOneReading = async (meterId: number) => {
  try {
    const data = await readingsRepo.findOneReading(meterId);
    return data;
  } catch (error) {
    throw error;
  }
};

const reportMeter = async (meterId: number, reason: string, image: any) => {
  try {
    await readingsRepo.reportMeter(meterId, reason, image);
    return ReadingConstants.METER_REPORTED;
  } catch (error) {
    throw error;
  }
};

const groupReadingsByDate = async (meterId: number) => {
  try {
    const data = await readingsRepo.groupReadingsByDate(meterId);
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  createReading,
  findOneReading,
  groupReadingsByDate,
  reportMeter,
};
