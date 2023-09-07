import { Schema } from "mongoose";

export class BaseSchema extends Schema {
  constructor(structure: any, options?: any) {
    super(
      {
        ...structure,
        createdBy: {
          type: String,
        },
        updatedBy: {
          type: String,
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true, ...options }
    );
  }
}
