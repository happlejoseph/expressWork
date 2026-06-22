

import Employee from "../model/employee.js"

export const addEmployee = async(req, res, next)=> {

    try {
        
        const {name, email, role} = req.body

        if(!name || !email || !role) {
            return res.status(400).json({
                message: 'all fields required'
            })
        }
        else {
            const newEmployee = new Employee({name, email, role})
            const saveEmployee = await newEmployee.save()

            res.status(200).json({
                status: true,
                message: 'successful',
                data: saveEmployee
            })
        }
    }
    catch(err) {
        console.log(err);
        
    }
}