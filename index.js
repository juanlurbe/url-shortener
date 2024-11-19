import express from "express";
import routes from "./routes/routes.js"
import {notFound} from "./middlewares/notFound.js"
import connection from "./connection/connection.js";
import { SERVER_PORT } from "./config/config.js";
import cookieParser from "cookie-parser";
import roleSeed from "./seed/roleSeed.js";

const app = express();

app.use(express.urlencoded( { extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

app.use(notFound);

//await connection.sync({ force: true });
await connection.sync({ alter: true });

//roleSeed();

app.listen(SERVER_PORT, () => {
    console.log(`Escuchando en puerto ${ SERVER_PORT }`);
    
});
