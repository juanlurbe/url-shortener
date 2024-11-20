import {User} from "../models/models.js";

async function userSeed() {
  try {
    await User.bulkCreate(
      [
        {id: 1, mail: "admin@ort.com", pass: "1234", name: "Admin", RoleId: 1 },
        {id: 2, mail: "user1@ort.com", pass: "1234", name: "User 1", RoleId: 2 },
        {id: 3, mail: "user2@ort.com", pass: "1234", name: "User 2", RoleId: 2 },
      ],
      { individualHooks: true }
    );
    console.log("Usuarios creados ok");

  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

//userSeed()
 export default userSeed;