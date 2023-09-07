import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";
import { roleModel } from "../roles/roles.schema";

export const userModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

roleModel.hasOne(userModel, { foreignKey: "roleId" });
userModel.belongsTo(roleModel, { foreignKey: "roleId" });
