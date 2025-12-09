import {Router} from "express";
import {getUsers,getUserById,postCreateUser,postVerifyUser} from "../controller/users.controller.js";


const router=Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/',postCreateUser);
router.post('/login',postVerifyUser);
//router.put('/id',);
//router.delete('/id',);


export default router;
