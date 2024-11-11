import {Role} from "../models/models.js";

class RoleService {


    getAllRolesService = async () => {
        try {
          const roles = await Role.findAll();
          return roles;
        } catch (error) {
          throw error;
        }
      };


}


export default RoleService;