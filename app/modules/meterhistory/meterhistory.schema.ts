import { sequelize } from "../../utility/sequelize";
import { DataTypes } from "sequelize";
import { meterModel } from "../meter/meter.schema";

export const meterHistoryModel = sequelize.define(
  "meterhistory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    meterStatus: {
      type: DataTypes.ENUM,
      values: ["WORKING", "FAULTY"],
      allowNull: false,
      defaultValue: "WORKING",
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

meterModel.hasMany(meterHistoryModel, { foreignKey: "meterId" });
meterHistoryModel.belongsTo(meterModel);
