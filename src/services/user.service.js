import bcrypt from "bcryptjs";
import { collection,getDocs,doc,getDoc } from "firebase/firestore";
import { db } from "../data/data.js";

export const findUsers = async () => {
        const snapshot = await getDocs(collection(db, "usuarios"));
         const users = snapshot.docs.map(d => {
        const { password, ...u } = d.data();
        return { id: d.id, ...u };
    });

    return users;
};

export const findUserById = async(id) => {
        const ref = doc(db, "usuarios", id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) return null;

        const { password, ...rest } = snapshot.data();
        return { id: snapshot.id, ...rest };
};

export const createUser = async (userData) => {
        const {nombre,email,password,rol,ubicacion,experiencia} = userData;
        if(!nombre || !email || !password){
            throw new Error("datos incompletos");
        }

        const existingUser = usuarios.find(u => u.email === email);
        if(existingUser){
            throw new Error("el email ya está en uso");
        }

        const hash= await bcrypt.hash(password, 10);

        const newUser = {
            id: usuarios.length + 1,
            nombre,
            email,
            password: hash,
            rol: rol || "sin asignar",
            ubicacion: ubicacion || "sin asignar",
            experiencia: experiencia || "sin experiencia"
        };
        usuarios.push(newUser);
        const {password: _, ...user} = newUser;
        return user;
};

export const verifyUserCredentials = async (email, password) => {
        const usuario = usuarios.find(u => u.email === email);
        if(!usuario){
            return "error de autenticación";
        }
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if(!isPasswordValid){
            return "error de autenticación";
        }
        const {password: _, ...rest} = usuario;
        return rest;
};