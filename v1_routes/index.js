const express = require("express");

const router = express.Router();

const booksRouter = require("./books");
const borrowHistoryRouter = require("./borrow-history");
const userRouter = require("./users");
const authRouter = require("./auth");

router.use("/books/", booksRouter);
router.use("/users/", userRouter);
router.use("/borrow-history/", borrowHistoryRouter);
router.use("/auth", authRouter);

module.exports = router;