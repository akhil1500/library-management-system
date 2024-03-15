const express = require("express");

const router = express.Router();

const bhController = require("../../controllers/borrow-history");

router.get("/", bhController.bhList);
router.get("/:id", bhController.getBhDataForAnId);
router.post("/", bhController.borrowABook);
router.put("/id", bhController.updateBorrowHistoryForAnId);


module.exports = router;