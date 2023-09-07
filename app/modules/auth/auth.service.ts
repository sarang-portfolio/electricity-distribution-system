import { createToken } from "../../utility/authorize";
import { sendEmail } from "../../utility/email";
import { createHash, createPassword } from "../../utility/password";
import rolesService from "../roles/roles.service";
import userService from "../user/user.service";
import { IUser } from "../user/user.types";
import { authConstants } from "./auth.constants";
import { ILogin } from "./auth.types";

const login = async (loginCredentials: ILogin) => {
  try {
    const user: any = await userService.getUserByCredentials(loginCredentials);
    if (user) {
      const role: any = await rolesService.getRole(user.roleId);
      const token = createToken({
        id: user.id,
        name: user.username,
        role: user.roleId,
      });
      return { role: role?.name, token: token };
    }
    throw authConstants.INVALID_DETAILS;
  } catch (error) {
    throw error;
  }
};

const createUser = async (userDetails: IUser) => {
  try {
    const newPassword = await createPassword();
    const { password, hashedPassword } = newPassword;
    await userService.createUser({ ...userDetails, password: hashedPassword });
    await sendEmail(
      userDetails.email,
      "ACCOUNT CREATED",
      `
            Hi, ${userDetails.username},
            Your Account has been created. Following are your login credentials:
            username:- ${userDetails.username},
            password:- ${password}
        `
    );
    return authConstants.USER_CREATED;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (
  userId: string,
  newPassword: string,
  oldPassword?: string
) => {
  try {
    newPassword = await createHash(newPassword);
    await userService.updatePassword(userId, newPassword, oldPassword);
    return authConstants.PASSWORD_UPDATED;
  } catch (error) {
    throw authConstants.INVALID_PASSWORD;
  }
};

const forgotPassword = async (email: string) => {
  try {
    const userDetails: any = await userService.getUserByMail(email);
    const token = createToken(userDetails.id.toString());
    const { URL } = process.env;
    const link = `${URL}/${token}`;
    await sendEmail(
      userDetails.email,
      "FORGOT PASSWORD",
      `
        Hi, ${userDetails.name},
        Your password reset link is ${link}

        If you did not request this, please ignore this email and your password will remain unchanged.
    `
    );
    return authConstants.PASSWORD_LINK;
  } catch (error) {
    console.log(error);
    throw authConstants.INVALID_EMAIL;
  }
};

export default {
  login,
  createUser,
  resetPassword,
  forgotPassword,
};
