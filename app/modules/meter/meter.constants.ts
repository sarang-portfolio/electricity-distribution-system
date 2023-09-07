import { MessageHandler } from "../../utility/response-handler";

export const MeterConstants = {
  NOT_FOUND: new MessageHandler(404, "Meter not found!"),
  METER_ADDED: new MessageHandler(201, "Meter added!"),
  METER_UPDATED: new MessageHandler(200, "Meter updated!"),
  METER_DELETED: new MessageHandler(200, "Meter deleted!"),
  METER_ALREADY_EXISTS: new MessageHandler(409, "Meter already exists!"),
  METER_NOT_DELETED: new MessageHandler(404, "Meter not deleted!"),
  METER_NOT_UPDATED: new MessageHandler(404, "Meter not updated!"),
  METER_NOT_ADDED: new MessageHandler(404, "Meter not added!"),
};
