import { Router } from "express";
import RoleController from "../controllers/RoleController.js";

const rolesRoutes = Router();

const roleController = new RoleController();

rolesRoutes.get("/", roleController.getAllRoles);


export default rolesRoutes;