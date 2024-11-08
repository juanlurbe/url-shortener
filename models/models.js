import Role from "./Role.js";
import User from "./User.js";
import Url from "./Url.js";

User.belongsTo(Role)
Role.hasMany(User)

User.hasMany(Url)
Url.belongsTo(User)

export {Role, User, Url}

