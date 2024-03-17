const express = require("express");

const router = express.Router();

const bhController = require("../../controllers/borrow-history");
const {authenticate, checkMemberAccess} = require("../../middlewares/validateJwtToken")

router.get("/", authenticate, checkMemberAccess ,bhController.bhList);
router.get("/:id", authenticate, checkMemberAccess ,bhController.getBhDataForAnId);
router.post("/", authenticate, checkMemberAccess ,bhController.borrowABook);
router.put("/:id/return", authenticate, checkMemberAccess ,bhController.updateBorrowHistoryForAnId);


module.exports = router;