import { Router } from "express";
import RoleController from "../controllers/RoleController.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { validateRole } from "../middlewares/validateRole.js";

const rolesRoutes = Router();

const roleController = new RoleController();


rolesRoutes.use(validateLogin);
rolesRoutes.use(validateRole);
rolesRoutes.get("/", roleController.getAllRoles);


export default rolesRoutes;