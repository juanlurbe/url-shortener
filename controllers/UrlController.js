import UrlService from "../services/UrlService.js";

class UrlController {
  urlService = new UrlService();

  
  getAllUrls = async (req, res) => {
    try {
      const { id, role } = req.user;

      const data = await this.urlService.getAllUrlsService(id, role);
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
      const { id: userId } = req.user;

      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const data = await this.urlService.createUrlService(longUrl, userId, baseUrl);
      res.status(201).send({ success: true, data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  
  updateUrl = async (req, res) => {
    try {
        const { id } = req.params; 
        const { longUrl } = req.body; 
        const { id: userId } = req.user; 
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        
        const data = await this.urlService.updateUrlService(id, longUrl, userId, baseUrl);
        if (!data) {
            return res.status(404).send({ success: false, message: "URL no encontrada" });
        }

        res.status(200).send({ success: true, message: "URL actualizada exitosamente", data });
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
