import express from "express";
import {
  createAccessory,
  getAllAccessories,
  getAccessoryById,
  updateAccessory,
  deleteAccessory,
} from "../controllers/accessoriesController.js";

const router = express.Router();

router.post("/accessories", createAccessory);
router.get("/accessories", getAllAccessories);
router.get("/accessories/:id", getAccessoryById);
router.put("/accessories/:id", updateAccessory);
router.delete("/accessories/:id", deleteAccessory);

export default router;