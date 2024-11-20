import { ROLE_ADMIN } from "../config/config.js";
import { User, Role } from "../models/models.js";
import { genToken, verifyToken } from "../utils/token.js";
import { validateUserData } from "../utils/validateUserData.js";

class UserService {

  getAllUsersService = async () => {
    try {
      const users = await User.findAll({
        attributes: ["name", "mail"],
        include: Role,
      });
      return users;
    } catch (error) {
      throw error;
    }
  };

  getUserByIdService = async (id) => {
    try {
      const user = await User.findAll({
        where: { id },
        attributes: ["name", "mail"],
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  loginService = async (user) => {
    try {
        const cleanedUser = validateUserData(user, false);

        const { mail, pass } = cleanedUser;

        const userLogin = await User.findOne({ 
            where: { mail },
            include: {
                model: Role, 
                attributes: ["name"], 
            },
        });

        if (!userLogin) throw new Error("Usuario no encontrado");

        const comparePass = await userLogin.compare(pass);
        if (!comparePass) throw new Error("Contraseña incorrecta");

        const payload = {
            id: userLogin.id,
            role: userLogin.Role.name,
            mail: userLogin.mail,
        };

        const token = genToken(payload);

        return token;

    } catch (error) {
        throw error;
    }
  };

  me = async (token) => {
    try {
      const verify = verifyToken(token);
      return verify.data;
    } catch (error) {
      throw error;
    }
  };


  createUserService = async (user) => {
    try {
        const cleanedUser = validateUserData(user, true);

        const newUser = await User.create(cleanedUser);

        return newUser;

    } catch (error) {
        throw error;
    }
  };


  updateUserService = async (data, loggedInUser) => {
    try {
        const { id } = data;
        const { id: loggedInUserId, role } = loggedInUser;

       if (role !== ROLE_ADMIN && parseInt(id) !== loggedInUserId) {
            throw new Error("Acceso denegado, no puedes modificar datos de otro usuario");
        }

        const cleanedData = validateUserData(data, false);

        const [updatedRows] = await User.update(cleanedData, { where: { id } });
        if (updatedRows === 0) {
            throw new Error("Usuario no encontrado o no actualizado");
        }

        const updatedUser = await User.findByPk(id);
        // return updatedUser;
        return {
          mail: updatedUser.mail,
          name: updatedUser.name
        }

    } catch (error) {
        throw error;
    }
  };

  deleteUserService = async (id, loggedInUser) => {
    try {
        const { id: loggedInUserId, role } = loggedInUser;

        if (role !== ROLE_ADMIN && parseInt(id) !== loggedInUserId) {
            throw new Error("Acceso denegado, no puede borrar la cuenta de otro usuario");
        }

        const deletedRows = await User.destroy({ where: { id } });
        if (deletedRows === 0) {
            throw new Error("usuario no encontrado o no eliminado");
        }

        return `Usuario con id ${id} eliminado ok`;
    } catch (error) {
        throw error;
    }
};
};

export default UserService;
