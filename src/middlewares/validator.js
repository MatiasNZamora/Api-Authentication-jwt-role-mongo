import { ROLES } from "../models/Role";
import USER from "../models/User";


// verificamos que no exista otro usuario o email con estos datos.
export const checkDuplicateAcount = async (req, res, next) => { 
    const user = await USER.findOne({username: req.body.username});
    if (user) return res.status(400).json({message:'the user already exists'}); 

    const email = await USER.findOne({email: req.body.email});
    if (email) return res.status(400).json({message:'the email already exists'}); 

    next();
}; 

// chequeamos que no esten pasando roles que no exiestan.
export const checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({message: `ROLE ${req.body.roles[i]} does not exist`}); 
            }
        }
    }
    next();
};