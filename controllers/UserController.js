import { ROLE_ADMIN } from "../config/config.js";
import UserService from "../services/UserService.js";


class UserController {
  userService = new UserService();

  getAllUsers = async (req, res) => {
    try {
      const {role} = req.user;

      if (role !== ROLE_ADMIN) {
        const error = new Error("Acceso denegado, no puede listar todos los usuarios");
        error.status = 403;
        throw error;
      }

      const data = await this.userService.getAllUsersService();
      res.status(200).send({ success: true, message: data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };


  

  getUserById = async (req, res) => {
    try {
      const { id: userIdFromParams } = req.params;
      const { id: userIdFromToken, role } = req.user;
     
      if(role !== ROLE_ADMIN && parseInt(userIdFromParams)!== userIdFromToken){
        const error = new Error("Acceso denegado, no puede acceder a info de otro usuario ");
        error.status = 403;
        throw error;
      }

      const data = await this.userService.getUserByIdService(userIdFromParams);
      
      res.status(200).send({ success: true, message: data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { name, mail, pass } = req.body;
      const data = await this.userService.createUserService({
        name,
        mail,
        pass,
      });
      res.status(200).send({ success: true, message: "Usuario creado con éxito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  login = async (req, res, next) => {
    try {
      const {mail, pass } = req.body;
      const data = await this.userService.loginService({
        mail,
        pass,
      });
      res.cookie("token", data);

      res.status(200).send({ success: true, message: "Usuario logueado con éxito" });

    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  
  getMe = async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const user = await this.userService.me(token);
            
      res.status(200).send({ success: true, message: user });

    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { name, pass, mail} = req.body;
      console.log(`🚀 ~ UserController ~ updateUser= ~ pass:`, pass)
      const { id } = req.params;
      const data = await this.userService.updateUserService({id, name, pass, mail});
      res.status(200).send({ success: true, message: "Usuario modificado con éxito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  
  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.userService.deleteUserService(id);
      res.status(200).send({ success: true, message: "Usuario eliminado con éxito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default UserController;
