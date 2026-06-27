

import Employee from "../model/employee.js"

// add employee //
export const addEmployee = async(req, res, next)=> {

    try {
        
        const {name, email, jobRole} = req.body

        if(!name || !email || !role) {
            return res.status(400).json({
                message: 'all fields required'
            })
        }
        else {
            const newEmployee = new Employee({name, email, jobRole})
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




// get all employee //
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



// get single employee //
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



// edit and update //
export const updateEmployee = async(req, res, next)=> {

    try {

        const {id, name, email, role} = req.body

        if(!id) {
            return res.status(400).json({
                message: 'id is required'
            })
        }

        const employee = await Employee.findById(id)
        if(!employee) {
            return req.status(404).json({
                message:'employee not found'
            })
        }

        const updateData = {}

        if(name) updateData.name = name
        if(email) updateData.email = email
        if(role) updateData.role = role

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData,{
            new: true,
        })

        res.status(200).json({
            status:true,
            message:'successful',
            data:updatedEmployee
        })

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
        
    }
}



// delete employee //
export const deleteEmployee = async(req, res, next)=> {

    try {

        const {id} = req.body

        if(!id) {
            return res.status(400).json({
                message: 'id is required'
            })
        }

        const deletedEmployee = await Employee.findByIdAndDelete(id)
        if(!deleteEmployee) {

            return res.status(404).json({
                message: 'employee not found'
            })
        }

            res.status(200).json({
                status:true,
                message:'successful',
                data:deletedEmployee
            })

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
        
    }
}