

import Router from "express";
import auth from "../middleware/authCheck.js"
import upload from "../middleware/multer.js"
import { addEmployee, deleteEmployee, getEmployee, singleEmployee, updateEmployee } from "../controllers/employeeController.js";


const router = Router()

router.use(auth);

router.post('/add', upload.single("image"), addEmployee)
router.get('/get', getEmployee)
router.get('/single', singleEmployee)
router.put('/edit', updateEmployee)
router.delete('/delete', deleteEmployee)

export default router