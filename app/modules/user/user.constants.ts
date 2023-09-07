import { MessageHandler } from "../../utility/response-handler";
export const userConstants = {
  NOT_FOUND: new MessageHandler(404, "user not found!"),
  USER_ADDED: new MessageHandler(201, "user added!"),
  USER_UPDATED: new MessageHandler(200, "user updated!"),
  PASSWORD_CHANGED: new MessageHandler(200, "password changed!"),
  USER_DELETED: new MessageHandler(200, "user deleted!"),
  UNIQUE_EMAIL: new MessageHandler(406, "email should be unique!"),
};
