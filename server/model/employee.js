import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        require:true
    },

    email: {
        type: String,
        require: true
    },

    role: {
        type: String,
        require: true
    }
},{timestamps:true})

const Employee = mongoose.model('employeeData', employeeSchema)

export default Employee