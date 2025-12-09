import { findProducts,findProductById,findCreateProduct,findDeleteProductById,findUpdateProductById } from "../services/product.service.js";

export const getProducts = async (req, res) => {
    try{
        const products = await findProducts();
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: "error al obtener los productos",error:error.message});
    }
};

export const getByIdProducts = async (req, res) => {
    try{
        const {id} = req.params;
        const product = await findProductById(id);
        if(!product){
            return res.status(404).json({message: "producto no encontrado"});
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: "error al obtener el producto por id",error:error.message});
    }
};

export const createProduct = async (req, res) => {
    try{
        const newProduct=await findCreateProduct(req.body);
        res.status(201).json({message: "producto creado exitosamente",producto: newProduct});
    }
    catch(error){
        res.status(400).json({message: "error al crear un nuevo producto",error:error.message});
    }
};

export const deletedProductById = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedProduct=await findDeleteProductById(id);
        if(!deletedProduct){
            return res.status(404).json({message: "producto no encontrado para eliminar"});
        }
        res.status(200).json({message: `producto con id ${id} eliminado`});
    }
    catch(error){
        res.status(500).json({message: "error al eliminar el producto por id",error:error.message});
    }
};

export const updateProductById = async(req, res) => {
    try{
        const {id} = req.params;
        const updatedProduct=await findUpdateProductById(id, req.body);
        if(!updatedProduct){
            return res.status(404).json({message: "producto no encontrado para actualizar"});
        }
        res.status(200).json({message: `producto con id ${id} actualizado`, producto: updatedProduct});
    }
    catch(error){
        res.status(500).json({message: "error al actualizar el producto por id",error:error.message});
    }

};