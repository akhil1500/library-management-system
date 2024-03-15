let controller = {};

controller = Object.assign(controller, require("./addNewBook"));
controller = Object.assign(controller, require("./getBookById"));
controller = Object.assign(controller, require("./getBooksList"));
controller = Object.assign(controller, require("./updateBookDetails"));
controller = Object.assign(controller, require("./deleteBook"));

module.exports = controller;