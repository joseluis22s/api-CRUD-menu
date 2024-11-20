import { Router } from "express";
import {
  createCRUD,
  deleteCRUD,
  getUnCRUD,
  getTodoCRUD,
  updateCRUD,
} from "../controllers/crud.controllers.js";

const router = Router();

router.post("/crud", createCRUD);

router.get("/crud", getTodoCRUD);

router.get("/crud/:id_crud", getUnCRUD);

router.put("/crud/:id_crud", updateCRUD);

// router.delete("/crud/:id_crud", cors(corsOptions), deleteCRUD);
router.delete("/crud/:id_crud", deleteCRUD);

export default router;
