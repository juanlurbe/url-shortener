import {Url} from "../models/models.js";

async function urlSeed() {
  try {
    await Url.bulkCreate([{ longUrl: "https://www.google.com", shortUrl:"XgT5Sh_", UserId: 1}, 
                          { longUrl: "https://www.facebook.com",shortUrl:"ZmTrWpo", UserId: 1},
                          { longUrl: "https://expressjs.com", shortUrl:"YgT2Shl", UserId: 2},
                          { longUrl: "https://nodejs.org", shortUrl:"UvTYShJ", UserId: 2}
                        ]);

  } catch (error) {

    console.log(error);
  }
}

//urlSeed()
 export default urlSeed;