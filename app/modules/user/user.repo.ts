import { Op } from "sequelize";
import { ILogin } from "../auth/auth.types";
import { userModel } from "./user.schema";
import { IUser } from "./user.types";

const getAllUsers = (
  limit?: number,
  offset?: number,
  sortBy?: string,
  orderBy?: string,
  searchBy?: string
) => {
  if (limit && offset === 0 && sortBy && orderBy && searchBy) {
    return userModel.findAll({
      limit,
      offset,
      order: [[sortBy, orderBy]],
      where: { name: { [Op.substring]: searchBy } },
    });
  } else if (limit && offset && sortBy && orderBy && searchBy) {
    return userModel.findAll({
      limit,
      offset,
      order: [[sortBy, orderBy]],
      where: { name: { [Op.substring]: searchBy } },
    });
  } else {
    return userModel.findAll();
  }
};

const getUser = (id: string) => userModel.findByPk(id);

const getUserByMail = (email: string) =>
  userModel.findOne({ where: { email } });

const getUserByCredentials = (credentials: ILogin) =>
  userModel.findOne({ where: { email: credentials.email } });

const createUser = (userDetails: IUser) => userModel.create({ ...userDetails });

const updateUser = (id: string, updatedUserDetails: any) =>
  userModel.update({ ...updatedUserDetails }, { where: { id: id } });

const deleteUser = (id: string) => userModel.destroy({ where: { id } });

export default {
  getAllUsers,
  getUser,
  getUserByMail,
  createUser,
  updateUser,
  deleteUser,
  getUserByCredentials,
};
