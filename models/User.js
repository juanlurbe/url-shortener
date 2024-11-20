import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class User extends Model {
  compare = async (myPlaintextPassword) => {
    const data = await bcrypt.compare(myPlaintextPassword, this.pass);
    return data
  };
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },

    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        isEmail: true
      }
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.salt = salt;
  const hash = await bcrypt.hash(user.pass, salt);
  user.pass = hash;
});

export default User;
