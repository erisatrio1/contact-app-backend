import Contact from "../model/Contact.js";
import { body, validationResult, check } from "express-validator";

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

export const getContactById = async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params._id });
  res.status(200).json(contact);
};

export const validationCreate = [
  body("name").custom(async (value) => {
    const duplicate = await Contact.findOne({ name: value });
    if (duplicate) {
      throw new Error("Name already used!");
    }

    return true;
  }),
  check("email", "Invalid email!").isEmail(),
  check("noPhone", "Invalid no Phone!").isMobilePhone("id-ID"),
];

export const createContact = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({Response: "False", errors: errors.array()});
  } else {
    Contact.insertMany(req.body);
    req.flash("msg", "Contact successfully added!");
    res.status(200).json({ msg: "Contact successfully added!" });
  }
};

export const validationUpdate = [
  body("name").custom(async (value, { req }) => {
    const duplicate = await Contact.findOne({ name: value });
    if (value !== req.body.oldName && duplicate) {
      throw new Error("Name already used!");
    }

    return true;
  }),
  check("email", "Invalid email!").isEmail(),
  check("noPhone", "Invalid no Phone!").isMobilePhone("id-ID"),
];

export const updateContact = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({Response: "False", errors: errors.array()});
  } else {
    Contact.updateOne(
      { _id: req.body._id },
      {
        $set: {
          name: req.body.name,
          noPhone: req.body.noPhone,
          email: req.body.email,
        },
      }
    ).then((result) => {
      req.flash("msg", "Contact has been changed!");
      res.status(200).json({ msg: "Contact successfully updated!" });
    });
  }
};

export const deleteContact = (req, res) => {
  Contact.deleteOne({ _id: req.params._id }).then((result) => {
    req.flash("msg", "Contact successfuly deleted!");
    res.status(200).json({ msg: "Contact successfully deleted!" });
  });
};
