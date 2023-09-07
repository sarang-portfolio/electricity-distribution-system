import { sequelize } from "../../utility/sequelize";
import { DataTypes } from "sequelize";
import { meterModel } from "../meter/meter.schema";

export const readingModel = sequelize.define(
  "readings",
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
    reading: {
      type: DataTypes.INTEGER,
    },
    reason: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

meterModel.hasMany(readingModel, { foreignKey: "meterId" });
readingModel.belongsTo(meterModel);
