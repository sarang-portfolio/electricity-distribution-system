import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";

export const meterModel = sequelize.define(
  "meter",
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
    avgReading: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);
