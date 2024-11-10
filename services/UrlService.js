import { Url } from "../models/models.js";
import { nanoid } from "nanoid";
import validator from "validator";

class UrlService {
  
  getAllUrlsService = async () => {
    try {
      const urls = await Url.findAll();
      return urls;
    } catch (error) {
      throw error;
    }
  };

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


  getUrlByIdService = async (id) => {
    try {
      const url = await Url.findByPk(id);
      if (!url) throw new Error("URL no encontrada");
      return url;
    } catch (error) {
      throw error;
    }
  };

  
  createUrlService = async (urlData) => {
    try {
      const { longUrl, UserId } = urlData;

      
      if (!validator.isURL(longUrl, { protocols: ["http", "https"], require_protocol: true })) {
        throw new Error("URL inválida");
      }

      let exists;
      let shortUrl;      
      do {
        shortUrl = nanoid(7);
        exists = await Url.findOne({ where: { shortUrl } });
      } while (exists);

      
      const newUrl = await Url.create({ longUrl, shortUrl, UserId });
      return newUrl;
    } catch (error) {
      throw error;
    }
  };

  
  updateUrlService = async (data) => {
    try {
      const { id, longUrl } = data;

      
      if (!validator.isURL(longUrl, { protocols: ["http", "https"], require_protocol: true })) {
        throw new Error("URL inválida");
      }

      
      const [updatedRows] = await Url.update(
        { longUrl },
        {
          where: { id },
        }
      );

      if (updatedRows === 0) {
        throw new Error("URL no encontrada o no actualizada");
      }

     
      const updatedUrl = await Url.findByPk(id);
      return updatedUrl;
    } catch (error) {
      throw error;
    }
  };

  
  deleteUrlService = async (id) => {
    try {
      const deletedRows = await Url.destroy({
        where: { id },
      });
      if (deletedRows === 0) {
        throw new Error("URL no encontrada o no eliminada");
      }
      return `URL con id ${id} eliminada exitosamente`;
    } catch (error) {
      throw error;
    }
  };
}

export default UrlService;
