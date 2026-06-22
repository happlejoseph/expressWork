

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



export const login = async(req, res, next)=> {
    
    try {

        const {email, password} = req.body

        if(!email) {

            return res.status(401).json({
                message: 'email is required'
            });
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                message: 'invalid email'
            })
        }

        const isMatch = await bcrypt.compare(
            req.body.password, user.password
        );

        if(!isMatch) {
            res.status(401).json({
                message: 'invalid password'
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email
            },

            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_TOKEN_EXPIRY
            }
        );

        return res.status(200).json({
            status: true,
            message: 'successful',
            data: null,
            result: user,
            access_token: token
        });


    }
    catch(err) {
        console.log(err);
        
    }
}