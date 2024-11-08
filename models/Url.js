import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Url extends Model {}

Url.init(
  {
    clics: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    longUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      },
    shortUrl: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
      },
  },
  {
    sequelize: connection,
    modelName: "Url",
  }
);



export default Url;
