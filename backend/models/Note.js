const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    blocks: [
      {
        tag: {
          type: String,
          required: true,
        },
        html: {
          type: String,
          required: false,
        },
        imageUrl: {
          type: String,
          required: false,
        },
      },
    ],
    creator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        mode: {
          type: String,
          enum: ["read", "write"],
          default: "read",
        },
      },
    ],
    readOnly: {
      type: Boolean,
      default: false,
    },
    template: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Note = new mongoose.model("Note", noteSchema);

module.exports = { Note, noteSchema };
