const asyncHandler = require("express-async-handler"); // async handler helps us to avoid writing try and catch blocks while resolving promises for every handler , instead it sends error to errorhandler middleware whenever error occurs
const Contact = require("../models/contactSchema");
// @desc get All Contacts
// @route GET /api/contacts
// @access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Get Contact
// @route GET /api/contacts/:id
// @access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not found");
  }
  res.status(200).json(contact);
});

// @desc Create New  Contact
// @route POST /api/contacts
// @access private

const createContact = asyncHandler(async (req, res) => {
  console.log("The req body of post req is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory ");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc update contact
// @route PUT /api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact with id : ${req.params.id} not found`);
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact with id : ${req.params.id} not found`);
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  getContacts,
  deleteContact,
  updateContact,
  createContact,
};
