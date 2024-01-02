const express = require("express");

const router = express.Router();

const {
    postNote,
    getNote,
    deleteNoteById,
    deleteNoteByTitle,
    updateNote,
    getNoteById,
} = require('../controllers/controllers.js');



router.route("/").get(getNote).post(postNote);

router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNoteById);
router.route("/:title").delete(deleteNoteByTitle);

module.exports = router;
