import { Url } from "../models/models.js";
import { nanoid } from "nanoid";
import validator from "validator";
import { ROLE_ADMIN, ROLE_USER } from "../config/config.js";

class UrlService {
  
  getAllUrlsService = async (id, role) => {
    try {
        let urls;

        if (role === ROLE_ADMIN) {
            urls = await Url.findAll();
        } else if (role === ROLE_USER) {
            urls = await Url.findAll({
                where: {
                    UserId: id,
                },
            });
        } else {
            throw new Error("Rol no válido para listar URLs");
        }

        return urls;
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

  
  createUrlService = async (longUrl, userId, baseUrl) => {
    try {
        
        if (!validator.isURL(longUrl, { protocols: ["http", "https"], require_protocol: true })) {
            throw new Error("Url inválida");
        }

        let exists;
        let shortUrl;
        do {
            shortUrl = nanoid(7);
            exists = await Url.findOne({ where: { shortUrl } });
        } while (exists);

        const newUrl = await Url.create({ longUrl, shortUrl, UserId: userId });
        const fullShortUrl = `${baseUrl}/${shortUrl}`;
        
        //return newUrl;
        return {
          longUrl,
          shortUrl: fullShortUrl
        }

    } catch (error) {
        throw error;
    }
  };

  
  updateUrlService = async (id, longUrl, userId, baseUrl) => {
    try {
        
        if (!validator.isURL(longUrl, { protocols: ["http", "https"], require_protocol: true })) {
            throw new Error("Url inválida");
        }

        const url = await Url.findOne({ where: { id, UserId: userId } });
        if (!url) {
            throw new Error("Acceso denegado, la Url no te pertenece");
        }

        const [updatedRows] = await Url.update(
            { longUrl },
            {
                where: { id, UserId: userId },
            }
        );

        if (updatedRows === 0) {
            throw new Error("Url no encontrada");
        }

        const updatedUrl = await Url.findByPk(id);
        const fullShortUrl = `${baseUrl}/${updatedUrl.shortUrl}`;
        
        return {
          longUrl,
          shortUrl: fullShortUrl
        };

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
