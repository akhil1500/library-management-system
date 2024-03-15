const express = require("express");

const router = express.Router();

const booksRouter = require("./books");
const borrowHistoryRouter = require("./borrow-history");
const userRouter = require("./users");

router.use("/books", booksRouter);
router.use("/users", userRouter);
router.use("/borrow-history", borrowHistoryRouter);

module.exports = router;