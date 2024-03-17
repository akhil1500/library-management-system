const express = require("express");

const router = express.Router();

const booksController = require("../../controllers/books");

const {authenticate, checkLibrarianAccess} = require("../../middlewares/validateJwtToken");
const paramsValidator = require("../../middlewares/paramsValidator");

router.get("/", authenticate, booksController.getBooksList);
router.get("/:id", authenticate ,booksController.getBookById);
router.post("/", authenticate, checkLibrarianAccess, paramsValidator(booksController.addNewBookParams()) ,booksController.addNewBook);
router.put("/:id", authenticate, checkLibrarianAccess, booksController.updateBookDetails);
router.delete("/:id", authenticate, checkLibrarianAccess, booksController.deleteBook);

module.exports = router;