import { findUsers,findUserById,createUser,verifyUserCredentials } from "../services/user.service.js";

export const getUsers = async (req, res) => {
    try{
        const usuarios = await findUsers();
        res.status(200).json(usuarios);
    }
    catch(error){
        res.status(500).json({message: "error al obtener los usuarios",error:error.message});
    }
};

export const getUserById = async (req, res) => {
    try{
        const {id} = req.params;
        const usuario = await findUserById(id);
        if(!usuario){
            return  res.status(404).json({message: "usuario no encontrado"});
        }
        res.status(200).json(usuario);
    }
    catch(error){
        res.status(500).json({message: "error al obtener el usuario",error:error.message});
    }
};

export const postCreateUser = async (req, res) => {
    try{
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({message: "error al crear el usuario", error: error.message});
    }
};

export const postVerifyUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const usuario = await verifyUserCredentials(email, password);
        res.status(200).json(usuario);
    }
    catch(error){
        res.status(500).json({message: "error al verificar el usuario", error: error.message});
    }
};


