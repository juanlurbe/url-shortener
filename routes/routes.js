import { Router } from "express";
import userRoutes from "./userRoutes.js"
import rolesRoutes from "./rolesRoutes.js"
import urlRoutes from "./urlRoutes.js"


const routes = Router();

routes.use("/roles", rolesRoutes);
routes.use("/users", userRoutes);
routes.use("/urls", urlRoutes);

export default routes;

