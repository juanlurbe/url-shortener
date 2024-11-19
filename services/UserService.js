import { User, Role } from "../models/models.js";
import { genToken, verifyToken } from "../utils/token.js";

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
      const { mail, pass } = user;

      const userLogin = await User.findOne({ 
        where: { mail },
        include: {
          model: Role, 
          attributes: ["name"], 
        },
       });
      
      if (!userLogin) throw new Error("User not found");
      
      const comparePass = await userLogin.compare(pass);
      if (!comparePass) throw new Error("User not found");

      const payload = {
        id: userLogin.id,
        role: userLogin.Role.name,
        mail: userLogin.mail,
        
      }

      const token = genToken(payload)

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
      
    }
  };


  createUserService = async (user) => {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  updateUserService = async (data) => {
    try {
      const { id, name, pass, mail } = data;
      const users = await User.update(
        { name, pass, mail },
        {
          where: { id },
        }
      );
      return users;
    } catch (error) {
      throw error;
    }
  };

  deleteUserService = async (id) => {
    return `deleteUserService ${id}`;
  };
};

export default UserService;
