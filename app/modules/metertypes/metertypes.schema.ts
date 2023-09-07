import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";
import { meterModel } from "../meter/meter.schema";

export const meterTypeModel = sequelize.define(
  "metertype",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricePerUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requiredNumberOfReadings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    faultTolerance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

meterTypeModel.hasOne(meterModel, { foreignKey: "meterTypeId" });
meterModel.belongsTo(meterTypeModel, { foreignKey: "meterTypeId" });
