const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getEventById,
  getEvent,
  getAllEvents,
  createEvent,
  updateEvent,
  removeEvent,
} = require("../controllers/event");

router.param("eid", getEventById);

router.get("/event/:eid", getEvent); // only this route doesn't require Authentication

router.get(
  "/event/user/all",
  passport.authenticate("jwt", { session: false }),
  getAllEvents
);

router.post(
  "/event",
  passport.authenticate("jwt", { session: false }),
  createEvent
);

router.put(
  "/event/:eid",
  passport.authenticate("jwt", { session: false }),
  updateEvent
);

router.delete(
  "/event/:eid",
  passport.authenticate("jwt", { session: false }),
  removeEvent
);

module.exports = router;
