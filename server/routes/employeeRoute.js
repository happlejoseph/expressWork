

import Router from "express";
import { addEmployee, getEmployee } from "../controllers/employeeController.js";


const router = Router()

router.post('/add', addEmployee)
router.get('/get', getEmployee)

export default router