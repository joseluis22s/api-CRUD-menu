// node .\src\index.js
import app from "./app.js";
import { getConnection } from "./database/connection.js";

//Creo que elige un puerto si el 80 no esta disponible
// const port = process.env.port || 80;

//Coneción para DB
getConnection();

// Arranque del servidor
// app.listen(port);
app.listen(3000);
// console.log(`SERVER INICIADO - puerto ${port}`);
console.log(`SERVER INICIADO - puerto 3000`);
