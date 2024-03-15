const express = require("express");

const router = express.Router();

const userController = require("../../controllers/users");

router.get("/", userController.getUserList);
router.get("/:id", userController.getUserDetails);
router.post("/", userController.addNewUser);
router.put("/:id", userController.updateUserDetails);
router.delete("/:id", userController.deleteUser);


module.exports = router;