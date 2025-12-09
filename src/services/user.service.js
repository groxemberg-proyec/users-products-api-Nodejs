import bcrypt from "bcryptjs";
import { db } from "../data/data.js";

import { collection,getDocs,doc,getDoc,addDoc,deleteDoc,updateDoc, query,where } from "firebase/firestore";

const ruta = "usuarios"

export const findUsers = async () => {
        const snapshot = await getDocs(collection(db, ruta));
         const users = snapshot.docs.map(d => {
        const { password, ...u } = d.data();
        return { id: d.id, ...u };
    });
    return users;
};

export const findUserById = async(id) => {
        const ref = doc(db, ruta, id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) return null;

        const { password, ...rest } = snapshot.data();
        return { id: snapshot.id, ...rest };
};

export const findCreateUser = async (userData) => {
        if(!userData.nombre || !userData.email || !userData.password){
            throw new Error("datos incompletos");
        }
        const usersCollectionRef = collection(db, ruta);

        const q = query(usersCollectionRef, where("email", "==",  userData.email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            throw new Error("el email ya está en uso");
        }

        const hash= await bcrypt.hash(userData.password, 10);

        
        const docRef = await addDoc(usersCollectionRef, {
            nombre: userData.nombre,
            email: userData.email,
            password: hash,
            rol: userData.rol || "sin asignar",
            ubicacion: userData.ubicacion || "sin asignar",
            experiencia: userData.experiencia || "sin experiencia"
        });

        const verNew = await getDoc(docRef);
        const { password, ...rest } = verNew.data();
        return rest;
};

export const verifyUserCredentials = async (email, password) => {
        const usersRef = collection(db, ruta);

        const q = query(usersRef, where("email", "==", email));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            throw new Error("usuario no encontrado");
        }

        const data = snapshot.docs[0].data();

        const isPasswordValid = await bcrypt.compare(password, data.password);

        if (!isPasswordValid) {
            return "Contraseña incorrecta";
        }
        const { password: _, ...rest } = data;
        return rest;
};

export const findUpdateUserById = async (id, updateData) => {
    const docRef = doc(db, ruta, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
        return null;
    }
    await updateDoc(docRef, updateData);
    const { password: _, ...rest } = snapshot.data();
    return rest;
}

export const findDeleteUserById = async (id) => {
    const docRef = doc(db, ruta, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
        return null;
    }
    await deleteDoc(docRef);
    return { message: "usuario eliminado exitosamente" };
};