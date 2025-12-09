import {Router} from "express";
import {getProducts, getByIdProducts,createProduct,deletedProductById,updateProductById} from "../controller/product.controller.js";


const router=Router();

router.get('/',getProducts);
router.get('/:id',getByIdProducts);
router.post('/crear',createProduct);
router.put('/:id',updateProductById);
router.delete('/:id',deletedProductById);


export default router;