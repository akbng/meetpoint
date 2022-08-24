const { Event } = require("../models/Event");
const { makeObject } = require("../utils");

const getEventById = async (req, res, next, id) => {
  try {
    const event = await Event.findById(id)
      .populate("creator", ["_id", "name", "email"])
      .populate("attendees.user", ["_id", "name", "email"]);

    if (!event)
      return res.status(400).json({
        error: true,
        reason: "Event not found",
      });

    req.event = event;

    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const getUpcomingEvents = async (req, res) => {
  const user = req.user;
  const currentDate = new Date();

  try {
    const events = await Event.find({
      creator: user._id,
      date: {
        $gte: currentDate,
        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 2),
      },
    }).populate("attendees.user", ["_id", "name", "email"]);

    if (events.length === 0)
      return res.status(400).json({
        error: true,
        reason: "No Upcoming Events found for the user",
      });

    return res.status(200).json({ error: false, data: events });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const getAllEvents = async (req, res) => {
  const user = req.user;

  try {
    const events = await Event.find({ creator: user._id }).populate(
      "attendees.user",
      ["_id", "name", "email"]
    );

    if (events.length === 0)
      return res.status(400).json({
        error: true,
        reason: "No Events found for the user",
      });

    return res.status(200).json({ error: false, data: events });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const getEvent = (req, res) =>
  res.status(200).json({ error: false, data: req.event });

const createEvent = async (req, res) => {
  const { name, description, date, time, color, attendees } = req.body;

  const isPastDate = new Date(date) < new Date();
  if (isPastDate)
    return res
      .status(400)
      .json({ error: true, reason: "Can not create event for the past" });

  const event = Event(
    makeObject({
      name,
      description,
      date,
      time,
      color,
      creator: req.user._id,
      attendees: attendees,
    })
  );

  try {
    const newEvent = await event.save({ validateBeforeSave: true });
    return res.status(200).json({ error: false, data: newEvent });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const updateEvent = async (req, res) => {
  if (!req.event.creator._id.equals(req.user._id)) return res.sendStatus(403);

  const { name, description, date, time, color, attendees, agenda, rules } =
    req.body;

  const isPastDate = date ? new Date(date) < new Date() : false;
  if (isPastDate)
    return res
      .status(400)
      .json({ error: true, reason: "Can not create event for the past" });

  try {
    const newEvent = await Event.findByIdAndUpdate(
      req.event._id,
      makeObject({
        name,
        description,
        date,
        time,
        color,
        attendees,
        agenda,
        rules,
      }),
      { useFindAndModify: false, new: true }
    );
    return res.status(200).json({ error: false, data: newEvent });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const removeEvent = async (req, res) => {
  if (!req.event.creator._id.equals(req.user._id)) return res.sendStatus(403);

  try {
    const deleted = await Event.deleteOne({ _id: req.event._id });

    return res.status(200).json({ error: false, data: deleted });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

module.exports = {
  getEventById,
  getUpcomingEvents,
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  removeEvent,
};
