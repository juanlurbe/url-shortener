import UrlService from "../services/UrlService.js";

class UrlController {
  urlService = new UrlService();

  
  getAllUrls = async (req, res) => {
    try {
      const data = await this.urlService.getAllUrlsService();
      res.status(200).send({ success: true, data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

    
  getUrlById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.urlService.getUrlByIdService(id);
      if (!data) {
        return res.status(404).send({ success: false, message: "URL no encontrada" });
      }
      res.status(200).send({ success: true, data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  
  createUrl = async (req, res) => {
    try {
      const { longUrl } = req.body;
      const data = await this.urlService.createUrlService({ longUrl });
      res.status(201).send({ success: true, data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  
  updateUrl = async (req, res) => {
    try {
      const { id } = req.params;
      const { longUrl } = req.body;
      const data = await this.urlService.updateUrlService({ id, longUrl });
      if (!data) {
        return res.status(404).send({ success: false, message: "URL no encontrada" });
      }
      res.status(200).send({ success: true, message: "URL actualizada exitosamente" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  
  deleteUrl = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.urlService.deleteUrlService(id);
      if (!data) {
        return res.status(404).send({ success: false, message: "URL no encontrada" });
      }
      res.status(200).send({ success: true, message: "URL eliminada exitosamente" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default UrlController;
