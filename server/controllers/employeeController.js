

import Employee from "../model/employee.js"

// add //
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


// get all //
export const getEmployee = async(req, res, next)=> {

    try {

        const getEmployee = await Employee.find();
        res.status(200).json({
            status: true,
            message: 'successful',
            data: getEmployee
        })
    }
    catch(err) {
        console.log(err);
        
    }
}



// get single //
export const singleEmployee = async(req, res, next)=> {

    try {

        const {id} = req.body

        if(!id) {
            return res.status(400).json(id)
            message: 'id is required'
        }

        const employee = await Employee.findById(id)
        if(!employee) {
            return res.status(404).json({
                message: 'employee not found'
            })
        }
        else {
            req.status(200).json({
                status:true,
                message:'successful',
                data:employee
            })
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
        
    }
}