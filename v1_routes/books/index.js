const express = require("express");

const router = express.Router();

const booksController = require("../../controllers/books");

router.get("/", booksController.getBooksList);
router.get("/:id", booksController.getBookById);
router.post("/", booksController.addNewBook);
router.put("/:id", booksController.updateBookDetails);
router.delete("/:id", booksController.deleteBook);

module.exports = router;