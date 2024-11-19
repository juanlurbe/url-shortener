import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { validateRole } from "../middlewares/validateRole.js";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.login);

userRoutes.get("/me", userController.getMe);

userRoutes.use(validateLogin);
userRoutes.use(validateRole);
userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;