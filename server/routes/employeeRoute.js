

import Router from "express";
import { addEmployee, deleteEmployee, getEmployee, singleEmployee, updateEmployee } from "../controllers/employeeController.js";


const router = Router()

router.post('/add', addEmployee)
router.get('/get', getEmployee)
router.get('/single', singleEmployee)
router.put('/edit', updateEmployee)
router.delete('/delete', deleteEmployee)

export default router