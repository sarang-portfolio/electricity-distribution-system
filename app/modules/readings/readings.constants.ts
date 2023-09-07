import { MessageHandler } from "../../utility/response-handler";

export const ReadingConstants = {
  NOT_FOUND: new MessageHandler(404, "READING not found!"),
  READING_ADDED: new MessageHandler(201, "READING added!"),
  READING_UPDATED: new MessageHandler(200, "READING updated!"),
  READING_DELETED: new MessageHandler(200, "READING deleted!"),
  READING_ALREADY_EXISTS: new MessageHandler(409, "READING already exists!"),
  READING_NOT_DELETED: new MessageHandler(404, "READING not deleted!"),
  READING_NOT_UPDATED: new MessageHandler(404, "READING not updated!"),
  READING_NOT_ADDED: new MessageHandler(404, "READING not added!"),
  METER_REPORTED: new MessageHandler(200, "METER reported!"),
};
