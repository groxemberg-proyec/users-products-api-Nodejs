import {Router} from "express";
import {getUsers,getUserById,createUser,postVerifyUser,updateUsersById,deleteUserById} from "../controller/users.controller.js";


const router=Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/crear',createUser);
router.post('/login',postVerifyUser);
router.put('/:id', updateUsersById);
router.delete('/:id', deleteUserById);


export default router;
