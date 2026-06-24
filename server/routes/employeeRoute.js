

import Router from "express";
import { addEmployee, getEmployee, singleEmployee } from "../controllers/employeeController.js";


const router = Router()

router.post('/add', addEmployee)
router.get('/get', getEmployee)
router.get('/single', singleEmployee)

export default router