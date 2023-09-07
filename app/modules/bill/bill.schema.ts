import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";
import { consumerModel } from "../consumer/consumer.schema";
import { meterModel } from "../meter/meter.schema";

export const billModel = sequelize.define(
  "bills",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    totalReading: {
      type: DataTypes.INTEGER,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

meterModel.hasMany(billModel, { foreignKey: "meterId" });
billModel.belongsTo(meterModel);

consumerModel.hasMany(billModel, { foreignKey: "consumerId" });
billModel.belongsTo(consumerModel);
