// Archivo para configurar "express"
// Creo que esto es el enrutador
import express from "express";
import crudRoutes from "./routes/crud.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(crudRoutes);

export default app;
