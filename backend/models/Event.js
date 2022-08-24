const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    color: {
      type: String,
      enum: ["red", "orange", "yellow", "green", "blue", "purple", "pink"],
      default: "blue",
    },
    attendees: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["going", "not going", "maybe"],
          default: "going",
        },
        acknowledged: {
          type: Boolean, // true if user has acknowledged he has read the event details/rules
          default: false,
        },
      },
    ],
    agenda: {
      type: ObjectId,
      ref: "Note",
    },
    rules: {
      type: ObjectId,
      ref: "Note",
    },
  },
  { timestamps: true }
);

const Event = new mongoose.model("Event", eventSchema);

module.exports = { Event, eventSchema };
