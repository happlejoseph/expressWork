

import Router from "express";
import { addEmployee } from "../controllers/employeeController.js";


const router = Router()

router.post('/add', addEmployee)

export default router