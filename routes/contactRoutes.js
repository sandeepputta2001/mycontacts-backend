const express = require("express");

const router = express.Router();

const {
  getContact,
  getContacts,
  deleteContact,
  updateContact,
  createContact,
} = require("../controllers/contactsController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getContacts).post(createContact); // Multiple HTTP Methods per a single route can be written like this to save some lines of code.
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
