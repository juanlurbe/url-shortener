import { ROLE_ADMIN, ROLE_USER } from "./config.js";

export const userPermissions = {
  "/users": {
      GET: [ROLE_ADMIN, ROLE_USER], 
      POST: [], 
      PUT: [ROLE_USER], 
      DELETE: [ROLE_USER],
  },
  "/roles": {
      GET: [ROLE_ADMIN], 
      POST: [ROLE_ADMIN], 
      PUT: [ROLE_ADMIN], 
      DELETE: [ROLE_ADMIN], 
  },
  "/urls": {
      GET: [ROLE_ADMIN, ROLE_USER], 
      POST: [ROLE_USER], 
      PUT: [ROLE_USER], 
      DELETE: [ROLE_USER],
  },
};