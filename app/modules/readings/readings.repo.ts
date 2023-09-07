import { sequelize } from "../../utility/sequelize";
import { meterModel } from "../meter/meter.schema";
import { addMeterHistory } from "../meterhistory/meterhistory.repo";
import { readingModel } from "./readings.schema";

const findOneReading = (meterId: number) =>
  readingModel.findOne({ where: { meterId } });

const createBulkReading = async (
  meterId: number,
  readings: any,
  images: any
) => {
  const data = readings.map((reading: any, index: any) => {
    return {
      meterId,
      reading: reading,
      image: images[index],
    };
  });
  await readingModel.bulkCreate(data);
  const avgReading: any = await groupReadingsByDate(meterId);
  const reading = avgReading[avgReading.length - 1].dataValues.avg;
  await meterModel.update(
    { avgReading: parseInt(reading), meterStatus: "WORKING" },
    { where: { id: meterId } }
  );
};

const groupReadingsByDate = (meterId: number) =>
  readingModel.findAll({
    where: { meterId },
    attributes: [
      "date",
      [sequelize.fn("AVG", sequelize.col("reading")), "avg"],
    ],
    group: ["date"],
  });

const reportMeter = async (meterId: number, reason: string, image: any) => {
  readingModel.create({
    meterId,
    reading: 0,
    image,
    reason,
  }),
    await addMeterHistory(meterId, "FAULTY");
  await meterModel.update(
    { avgReading: 0, meterStatus: "FAULTY" },
    { where: { id: meterId } }
  );
};

export default {
  createBulkReading,
  findOneReading,
  groupReadingsByDate,
  reportMeter,
};
