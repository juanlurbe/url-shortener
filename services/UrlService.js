import { Url } from "../models/models.js";
import { nanoid } from "nanoid";
import validator from "validator";

class UrlService {
  // Obtener todas las URLs
  getAllUrlsService = async () => {
    try {
      const urls = await Url.findAll();
      return urls;
    } catch (error) {
      throw error;
    }
  };

  // Obtener una URL por ID
  getUrlByIdService = async (id) => {
    try {
      const url = await Url.findByPk(id);
      if (!url) throw new Error("URL no encontrada");
      return url;
    } catch (error) {
      throw error;
    }
  };

  // Crear una nueva URL (acortar URL)
  createUrlService = async (urlData) => {
    try {
      const { urlLarga } = urlData;

      // Validar que urlLarga es una URL válida
      if (!validator.isURL(urlLarga, { protocols: ["http", "https"], require_protocol: true })) {
        throw new Error("URL inválida");
      }

      // Generar un código único para la URL corta
      let urlCorta;
      let exists;
      do {
        urlCorta = nanoid(7);
        exists = await Url.findOne({ where: { urlCorta } });
      } while (exists);

      // Crear la nueva URL en la base de datos
      const newUrl = await Url.create({ urlLarga, urlCorta });
      return newUrl;
    } catch (error) {
      throw error;
    }
  };

  // Actualizar una URL existente
  updateUrlService = async (data) => {
    try {
      const { id, urlLarga } = data;

      // Validar que urlLarga es una URL válida
      if (!validator.isURL(urlLarga, { protocols: ["http", "https"], require_protocol: true })) {
        throw new Error("URL inválida");
      }

      // Actualizar la URL en la base de datos
      const [updatedRows] = await Url.update(
        { urlLarga },
        {
          where: { id },
        }
      );

      if (updatedRows === 0) {
        throw new Error("URL no encontrada o no actualizada");
      }

      // Opcionalmente, puedes devolver la URL actualizada
      const updatedUrl = await Url.findByPk(id);
      return updatedUrl;
    } catch (error) {
      throw error;
    }
  };

  // Eliminar una URL
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
