import { MessageHandler } from "../../utility/response-handler";

export const BillConstants = {
  NOT_FOUND: new MessageHandler(404, "BILL not found!"),
  BILL_ADDED: new MessageHandler(201, "BILL added!"),
  BILL_UPDATED: new MessageHandler(200, "BILL updated!"),
  BILL_DELETED: new MessageHandler(200, "BILL deleted!"),
  BILL_ALREADY_EXISTS: new MessageHandler(409, "BILL already exists!"),
  BILL_NOT_DELETED: new MessageHandler(404, "BILL not deleted!"),
  BILL_NOT_UPDATED: new MessageHandler(404, "BILL not updated!"),
  BILL_NOT_ADDED: new MessageHandler(404, "BILL not added!"),
};
