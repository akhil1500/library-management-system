const express = require("express");

const router = express.Router();

const bhController = require("../../controllers/borrow-history");
const {authenticate, checkMemberAccess} = require("../../middlewares/validateJwtToken");
const paramsValidator = require("../../middlewares/paramsValidator");

router.get("/", authenticate, checkMemberAccess ,bhController.bhList);
router.get("/:id", authenticate, checkMemberAccess ,bhController.getBhDataForAnId);
router.post("/", authenticate, checkMemberAccess, paramsValidator(bhController.borrowABookParams()) ,bhController.borrowABook);
router.put("/:id/return", authenticate, checkMemberAccess, paramsValidator(bhController.updateBorrowHistoryForAnIdParams()) ,bhController.updateBorrowHistoryForAnId);


module.exports = router;