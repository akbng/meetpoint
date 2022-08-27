const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getNoteById,
  getNote,
  getAllNotes,
  createNote,
  updateNote,
  removeNote,
} = require("../controllers/note");

router.param("nid", getNoteById);

router.get("/note/:nid", getNote); // only this route doesn't require Authentication

router.get(
  "/note/user/all",
  passport.authenticate("jwt", { session: false }),
  getAllNotes
);

router.post(
  "/note",
  passport.authenticate("jwt", { session: false }),
  createNote
);

router.put(
  "/note/:nid",
  passport.authenticate("jwt", { session: false }),
  updateNote
);

router.delete(
  "/note/:nid",
  passport.authenticate("jwt", { session: false }),
  removeNote
);

module.exports = router;
