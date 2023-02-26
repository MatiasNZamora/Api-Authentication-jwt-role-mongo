import { Router } from "express";
const router  = Router();
import * as userCrl from "../controllers/users.controllers";
import {authJwt, verifySignup} from "../middlewares";


// creamos una ruta para enlistar todos los usuarios.
router.post ('/', [
    authJwt.verifyToken,
    verifySignup.checkRolesExisted,
    authJwt.isAdmin
],
    userCrl.createUser);

export default router;