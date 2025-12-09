import {Router} from "express";
import {getUsers,getUserById,createUser,postVerifyUser,updateUsersById,deleteUserById} from "../controller/users.controller.js";
import { verifyAuthJWT,checkAdminRole } from "../middlewares/authJWT.js";


const router=Router();

router.get('/',verifyAuthJWT,checkAdminRole,getUsers);
router.get('/:id', getUserById);
router.post('/crear',createUser);
router.post('/login',postVerifyUser);
router.put('/:id', updateUsersById);
router.delete('/:id', deleteUserById);


export default router;
