

import bcrypt from 'bcrypt'
import User from '../model/user.js'


export const register = async(req, res, next)=> {

    try {

        const {name, email, phone, role, password} = req.body

        if(!name || !email || !phone || !role || !password) {

            return res.status(400).json({
                message: 'all fields required'
            })
        }

        const existingEmail = await User.findOne({email})

        if(existingEmail) {
            
            return res.status(400).json({
                message: 'email is already exist'
            })
        }

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({name, email, phone, role, password:hash})
        const saveUser = await newUser.save()

        res.status(200).json({
            status: true,
            message: 'successful',
            data: saveUser
        })
    }
    catch(err) {
        console.log(err);
        
    }
}