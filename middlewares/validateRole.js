import { userPermissions } from "../config/permissions.js";

export const validateRole = (req, res, next) => {
    try {
        const { role } = req.user; 
        const method = req.method;
        const endpoint = req.baseUrl;
       
        const allowedRoles = userPermissions[endpoint]?.[method] || [];
        
        if (!allowedRoles.includes(role)) {
            throw new Error(`Acceso denegado: ${role} no tiene permisos para ${method} en ${endpoint}`);
        }

        next(); 
    } catch (error) {
        res.status(403).send({ success: false, message: error.message });
    }
};
