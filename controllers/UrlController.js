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
        const { id: userId, role } = req.user; 

        const data = await this.urlService.getUrlByIdService(id, userId, role);
        res.status(200).send({ success: true, data });
        
    } catch (error) {
        res.status(error.status || 400).send({ success: false, message: error.message });
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
        const { id: userId, role } = req.user;

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const data = await this.urlService.updateUrlService(id, longUrl, userId, role, baseUrl);
        
        res.status(200).send({ success: true, message: "URL actualizada exitosamente", data });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
};



  
  deleteUrl = async (req, res) => {
    try {
        const { id } = req.params; 
        const { id: userId } = req.user; 

        const data = await this.urlService.deleteUrlService(id, userId);
        res.status(200).send({ success: true, message: data });
        
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
  };

}

export default UrlController;
