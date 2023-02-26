import { Router } from "express";
const router  = Router();

import * as authCrl from "../controllers/auth.controllers"; 
import { verifySignup } from "../middlewares";

router.post('/signUp', [verifySignup.checkDuplicateAcount, verifySignup.checkRolesExisted], authCrl.signUp)

router.post('/signin', authCrl.signin)







export default router;