

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/user.js'

// register //
export const register = async(req, res, next)=> {

    try {
        
        const {name, email, phone, role, password} = req.body

        if(!name || !email || !phone || !role || !password) {
            return res.status(400).json({
                message:'all field required'
            });
        }

        const existingEmail = await User.findOne({email})

        if(existingEmail) {
            return res.status(400).json({
                message:'email is alredy exist'
            });
        }

        const saltRound = 10
        const salt = bcrypt.genSaltSync(saltRound)
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

        res.status(500).json({
            message: err.message
        })
        
    }
}


// login //
export const login = async(req, res, next)=> {

    try {

        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({
                message:'email and password required'
            })
        }
        else {

            const user = await User.findOne({email})
            if(!user) {
                return res.status(401).json({
                    message:'invalied user'
                })
            }
            else {
                
                const isPassword = await bcrypt.compare(
                    req.body.password, user.password
                )

                if(isPassword) {
                    const token = jwt.sign(

                        {userId:user._id,
                        userEmail:user.email,
                        userRole:user.role},

                        process.env.JWT_SECRET,

                        {expiresIn:process.env.JWT_TOKEN_EXPIRY}
                    );

                    res.status(200).json({
                        status:true,
                        message:'successful',
                        data:null,
                        result:user,
                        access_token:token
                    })
                }
                else {
                    return res.status(401).json({
                        message:'invalid password'
                    });
                }
            }
        }
    }
    catch(err) {
        console.log(err);

        res.status(500).json({
            message: err.message
        })
        
    }
}