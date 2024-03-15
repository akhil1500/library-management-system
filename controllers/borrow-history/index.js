let controller = {};

controller = Object.assign(controller, require("./bhList"));
controller = Object.assign(controller, require("./borrowABook"));
controller = Object.assign(controller, require("./getBhDataForAnId"));
controller = Object.assign(controller, require("./updateBorrowHistoryForAnId"));

module.exports = controller;