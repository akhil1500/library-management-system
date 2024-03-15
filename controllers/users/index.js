let controller = {};

controller = Object.assign(controller, require("./addNewUser"));
controller = Object.assign(controller, require("./deleteUser"));
controller = Object.assign(controller, require("./getUserDetails"));
controller = Object.assign(controller, require("./getUserList"));
controller = Object.assign(controller, require("./updateUserDetails"));

module.exports = controller;