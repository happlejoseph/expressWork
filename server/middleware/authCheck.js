import { json } from "express";
import User from "../model/user";


// authorization //
export const auth = async(req, res, next)=> {

    if(req.method === 'OPTIONS') {
        return next()
    }
    else {

        try {

            const token = req.headers.authorization.split(' ') [1]
            
            if(!token) {
                return res.status(400).json({
                    message:'authentication failed'
                });
            }
            else {

                const decodedToken = jwt.verify(
                    token,
                    process.env.JWT_SECRET)

                const validUser = await User.findById({decodedToken.userId})

                if(!validUser) {
                    return res.status(400).json({
                        message:'invalid user'
                    });
                }
                else {
                    req.userDetails = {

                        userId: decodedToken.userId,
                        userRole: decodedToken.userRole
                    }
                    next()
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
}