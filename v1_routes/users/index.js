const express = require("express");

const router = express.Router();

const userController = require("../../controllers/users");
const {authenticate, checkLibrarianAccess} = require("../../middlewares/validateJwtToken");
const paramsValidator = require("../../middlewares/paramsValidator");

router.get('/', authenticate, checkLibrarianAccess ,userController.getUserList);
router.get('/:id', authenticate ,userController.getUserDetails);
router.post('/', authenticate, checkLibrarianAccess, paramsValidator(userController.addNewUserParams()) ,userController.addNewUser);
router.put('/:id', authenticate ,userController.updateUserDetails);
router.delete('/:id', authenticate, checkLibrarianAccess ,userController.deleteUser);


module.exports = router;