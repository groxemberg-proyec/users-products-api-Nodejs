import {db} from "../data/data.js";
import { collection,getDoc,getDocs,doc,addDoc,deleteDoc,updateDoc } from "firebase/firestore";

const collectionName="productos";

export const findProducts= async()=>{
    const snapshot=await getDocs(collection(db,collectionName));
    const products=snapshot.docs.map(d=>({id:d.id,...d.data()}));
    if(products.length===0){
        throw new Error("no hay productos disponibles");
    }
    return products;
};

export const findProductById= async(id)=>{
    const ref=doc(db,collectionName,id);
    const snapshot=await getDoc(ref);
    if(!snapshot.exists()){
        return null;
    }
    return {id: snapshot.id, ...snapshot.data()};
};

export const findCreateProduct= async(productData)=>{
    if(!productData.nombre || !productData.precio){
        throw new Error("datos incompletos para crear el producto");
    }
    const productCollectionRef = collection(db, collectionName);
    const docRef = await addDoc(productCollectionRef,{
        nombre: productData.nombre,
        precio: Number(productData.precio),
        stock: Number(productData.stock || 0),  
        descripcion: productData.descripcion || "",
        categoria: productData.categoria || ""
    });
    const verNew = await getDoc(docRef);
    return {id: verNew.id, ...verNew.data()};
}

export const findDeleteProductById= async(id)=>{
    const docRef=doc(db,collectionName,id);
    const snapshot=await getDoc(docRef);
    if(!snapshot.exists()){
        return null;
    }
    await deleteDoc(docRef);
    return {message: "producto eliminado exitosamente"};
};

export const findUpdateProductById= async(id,updateData)=>{
    const docRef=doc(db,collectionName,id);
    const snapshot=await getDoc(docRef);
    if(!snapshot.exists()){
        return null;
    }
    await updateDoc(docRef, updateData);
    return {message: "producto actualizado exitosamente"};


};