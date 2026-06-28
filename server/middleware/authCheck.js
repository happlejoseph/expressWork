import { json } from "express";


// authorization //
export const auth = async(req, res, next)=> {

    if(req.method === 'OPTIONS') {
        return next()
    }
    else {

        try {

            const token = req.headers.authorization.split(' ') [1]
            
            if(!token) {
                return res.status(400),json({
                    message:'authentication failed'
                });
            }
            else {

                const decodedToken = jwt.verify(token, process,env.JWT_SECRET) 
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