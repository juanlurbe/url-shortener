import { Url } from "../models/models.js";

class RedirectionService {


    getLongUrlByShortUrl = async (shortUrl) => {
        try {
          const url = await Url.findOne({ where: { shortUrl } });
          return url;
        } catch (error) {
          throw error;
        }
      };
    
      
    incrementClicks = async (shortUrl) => {
        try {
          await Url.increment('clics', { where: { shortUrl } });
        } catch (error) {
          throw error;
        }
      };


}


export default RedirectionService;