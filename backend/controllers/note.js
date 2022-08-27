const { Note } = require("../models/Note");
const { makeObject } = require("../utils");

const getNoteById = async (req, res, next, id) => {
  try {
    const note = await Note.findById(id).populate("creator", [
      "_id",
      "name",
      "email",
    ]);

    if (!note)
      return res.status(400).json({
        error: true,
        reason: "Note not found",
      });

    req.note = note;

    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const getAllNotes = async (req, res) => {
  const user = req.user;

  try {
    const notes = await Note.find({ creator: user._id });

    if (notes.length === 0)
      return res.status(400).json({
        error: true,
        reason: "No Notes found for the user",
      });

    return res.status(200).json({ error: false, data: notes });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const getNote = (req, res) =>
  res.status(200).json({ error: false, data: req.note });

const createNote = async (req, res) => {
  const { title, description, blocks, readOnly, template } = req.body;

  const note = Note(
    makeObject({
      title,
      description,
      blocks,
      creator: req.user._id,
      readOnly,
      template,
    })
  );

  try {
    const newNote = await note.save({ validateBeforeSave: true });
    return res.status(200).json({ error: false, data: newNote });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const updateNote = async (req, res) => {
  if (!req.note.creator._id.equals(req.user._id)) return res.sendStatus(403);

  const { title, description, blocks, sharedWith, readOnly, template } =
    req.body;

  try {
    const newNote = await Note.findByIdAndUpdate(
      req.note._id,
      makeObject({
        title,
        description,
        blocks,
        sharedWith,
        readOnly,
        template,
      }),
      { useFindAndModify: false, new: true }
    );
    return res.status(200).json({ error: false, data: newNote });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const removeNote = async (req, res) => {
  if (!req.note.creator._id.equals(req.user._id)) return res.sendStatus(403);

  try {
    const deleted = await Note.deleteOne({ _id: req.note._id });

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
  getNoteById,
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  removeNote,
};
