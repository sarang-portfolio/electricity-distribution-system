import { MessageHandler } from "../../utility/response-handler";

export const ConsumerConstants = {
  NOT_FOUND: new MessageHandler(404, "Consumer not found!"),
  CONSUMER_ADDED: new MessageHandler(201, "Consumer added!"),
  CONSUMER_UPDATED: new MessageHandler(200, "Consumer updated!"),
  CONSUMER_DELETED: new MessageHandler(200, "Consumer deleted!"),
  CONSUMER_EXISTS: new MessageHandler(409, "Consumer already exists!"),
  CONSUMER_NOT_UPDATED: new MessageHandler(409, "Consumer not updated!"),
  CONSUMER_NOT_DELETED: new MessageHandler(409, "Consumer not deleted!"),
  CONSUMER_NOT_ADDED: new MessageHandler(409, "Consumer not added!"),
  AGENT_ASSIGNED: new MessageHandler(200, "Agent assigned!"),
  AGENT_NOT_ASSIGNED: new MessageHandler(409, "Agent not assigned!"),
};
