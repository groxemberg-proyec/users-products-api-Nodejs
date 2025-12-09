import { findUsers,findUserById,findCreateUser,verifyUserCredentials,findUpdateUserById,findDeleteUserById } from "../services/user.service.js";

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

export const createUser = async (req, res) => {
    try{
        const newUser = await findCreateUser(req.body);
        res.status(201).json({message: "Usuario creado exitosamente", user: newUser});
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

export const updateUsersById = async(req, res) => {
    try{
        const {id} = req.params;
        const updatedUser=await findUpdateUserById(id, req.body);
        if(!updatedUser){
            return res.status(404).json({message: "usuario no encontrado para actualizar"});
        }
        res.status(200).json({message: `usuario con id ${id} actualizado exitosamente`, usuario: updatedUser});
    }
    catch(error){
        res.status(500).json({message: "error al actualizar el usuario por id",error:error.message});
    }
};
export const deleteUserById = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedUser = await findDeleteUserById(id);
        if(!deletedUser){
            return res.status(404).json({message: "usuario no encontrado para eliminar"});
        }
        res.status(200).json(deletedUser);
    }
    catch(error){
        res.status(500).json({message: "error al eliminar el usuario por id",error:error.message});
    }
};