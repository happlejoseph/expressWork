

import Router from "express";
import auth from "../middleware/authCheck.js"
import { addEmployee, deleteEmployee, getEmployee, singleEmployee, updateEmployee } from "../controllers/employeeController.js";


const router = Router()

router.post('/add', auth, addEmployee)
router.get('/get', auth, getEmployee)
router.get('/single', auth, singleEmployee)
router.put('/edit', auth, updateEmployee)
router.delete('/delete', auth, deleteEmployee)

export default router