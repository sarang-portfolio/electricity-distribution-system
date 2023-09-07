import { MessageHandler } from "../../utility/response-handler";

export const MeterHistoryConstants = {
  NOT_FOUND: new MessageHandler(404, "METER HISTORY not found!"),
};
