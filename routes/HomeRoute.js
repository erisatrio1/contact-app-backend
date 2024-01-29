import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  validationCreate,
  deleteContact,
  validationUpdate,
  updateContact,
} from "../controllers/Home.js";


const router = express.Router();

router.get("/", getContacts);
router.get("/detail/:_id", getContactById);
router.post("/create", validationCreate, createContact);
router.put("/edit/:_id", validationUpdate, updateContact);
router.delete("/detail/:_id", deleteContact);

export default router;
