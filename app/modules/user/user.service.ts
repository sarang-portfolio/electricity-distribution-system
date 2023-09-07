import { compare } from "bcryptjs";
import { ILogin } from "../auth/auth.types";
import consumerService from "../consumer/consumer.service";
import { userConstants } from "./user.constants";
import userRepo from "./user.repo";
import { IUser } from "./user.types";

const getAllUsers = async (
  limit?: number,
  offset?: number,
  sortBy?: string,
  orderBy?: string,
  searchBy?: string
) => {
  try {
    return await userRepo.getAllUsers(limit, offset, sortBy, orderBy, searchBy);
  } catch (error) {
    throw error;
  }
};

const getUser = async (id: string) => {
  try {
    return await userRepo.getUser(id);
  } catch (error) {
    throw error;
  }
};

const getUserByCredentials = async (credentials: ILogin) => {
  try {
    const user: any = await userRepo.getUserByCredentials(credentials);
    if (user) {
      const isMatch = await compare(credentials.password, user.password);
      if (isMatch) {
        return user;
      }
    }
    throw userConstants.NOT_FOUND;
  } catch (error) {
    throw error;
  }
};

const getUserByMail = async (email: string) => {
  try {
    return await userRepo.getUserByMail(email);
  } catch (error) {
    throw error;
  }
};

const createUser = async (userDetails: IUser) => {
  try {
    return await userRepo.createUser(userDetails);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id: string, updatedUserDetails: any) => {
  try {
    return await userRepo.updateUser(id, updatedUserDetails);
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (
  id: string,
  newPassword: string,
  oldPassword?: string
) => {
  try {
    const user: any = await userRepo.getUser(id);
    if (user) {
      if (oldPassword) {
        const isMatch = await compare(oldPassword, user.password);
        if (isMatch) {
          return await userRepo.updateUser(id, { password: newPassword });
        }
        return userConstants.NOT_FOUND;
      }
      return await userRepo.updateUser(id, { password: newPassword });
    }
    return userConstants.NOT_FOUND;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id: string) => {
  try {
    return await userRepo.deleteUser(id);
  } catch (error) {
    throw error;
  }
};

const assignAgent = async (data: any) => {
  try {
    return await consumerService.assignAgent(data);
  } catch (error) {
    throw error;
  }
};

const getAssignedConsumers = async (id: string) => {
  try {
    return await consumerService.getConsumerDetails(id);
  } catch (error) {
    throw error;
  }
};

export default {
  getAllUsers,
  getUser,
  getUserByMail,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
  getUserByCredentials,
  assignAgent,
  getAssignedConsumers,
};
