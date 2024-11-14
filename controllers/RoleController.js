import RoleService from "../services/RoleService.js";

class RoleController {

    roleService = new RoleService();

    getAllRoles = async (req, res) => {
        try {
          const data = await this.roleService.getAllRolesService();
          res.status(200).send({ success: true, data });
        } catch (error) {
          res.status(400).send({ success: false, message: error.message });
        }
      };



}

export default RoleController;