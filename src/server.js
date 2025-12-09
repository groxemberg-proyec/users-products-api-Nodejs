import express from "express";
import dotenv from "dotenv/config";
import usersRouter from "./routes/users.routes.js";
import productsRouter from "./routes/products.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());    

app.use(['/users','/usuarios'], usersRouter);
app.use(['/products','/productos'], productsRouter);

app.get('/', (req, res) => {
    res.status(400).json({error:"ruta no encontrada"});
    });

const PORT= process.env.PORT || 3001;
app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`));