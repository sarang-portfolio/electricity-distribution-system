import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";
import { meterModel } from "../meter/meter.schema";
import { userModel } from "../user/user.schema";

export const consumerModel = sequelize.define(
  "consumer",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

consumerModel.hasMany(meterModel, { foreignKey: "consumerId" });
meterModel.belongsTo(consumerModel, { foreignKey: "consumerId" });

consumerModel.belongsTo(userModel, { foreignKey: "userId" });
