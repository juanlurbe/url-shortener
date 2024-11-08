import express from "express";
import routes from "./routes/routes.js"
import {notFound} from "./middlewares/notFound.js"
import { SERVER_PORT } from "./config/config.js";

const app = express();

app.use(express.urlencoded( { extended: true}));
app.use(express.json());

app.use("/", routes);

app.use(notFound);



app.listen(SERVER_PORT, () => {
    console.log("Escuchando en puerto ${SERVER_PORT}");
});
