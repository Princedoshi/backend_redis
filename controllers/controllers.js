const asyncHandler = require('express-async-handler');
const { Note } = require("../models/models.js");
const { Types } = require('mongoose');

const validateNoteInput = (req, res, next) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Send all required fields: title, content",
        });
    }

   

    next();
};

const postNote = asyncHandler(async (req, res) => {
    try {
        const newNote = {
            title: req.body.title,
            content: req.body.content,
        }

        const note = await Note.create(newNote);

        return res.status(201).json(note);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

const getNote = asyncHandler(async (req, res) => {
    try {
        const notes = await Note.find({});

        if (notes.length === 0) {
            return res.status(200).json({
                message: "No notes found",
            });
        }

        const notesData = notes.map(note => ({
            id: note._id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        }));

        return res.status(200).json({
            data: notesData,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

const getNoteById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        return res.status(200).json({
            data: {
                id: note._id,
                title: note.title,
                content: note.content,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

const deleteNoteById = asyncHandler(async (req, res) => {
    try {
        const noteId = req.params.id;
        const noteToDelete = await Note.findById(noteId);

        if (!noteToDelete) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        await noteToDelete.deleteOne();

        return res.status(200).json({
            message: "Note deleted successfully",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

const deleteNoteByTitle = asyncHandler(async (req, res) => {
    try {
        const { title } = req.params;
        const noteToDelete = await Note.findOneAndDelete({ title });

        if (noteToDelete === null) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        return res.status(200).json({
            message: "Note deleted successfully",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

const updateNote = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const noteToUpdate = await Note.findById(id);

        if (!noteToUpdate) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        noteToUpdate.title = req.body.title;
        noteToUpdate.content = req.body.content;

        await noteToUpdate.save();

        return res.status(200).json({
            message: "Note updated successfully",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    getNote,
    getNoteById,
    postNote: [validateNoteInput, postNote], 
    deleteNoteById,
    deleteNoteByTitle,
    updateNote: [validateNoteInput, updateNote], 
};
