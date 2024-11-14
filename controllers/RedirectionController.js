import RedirectionService from "../services/RedirectionService.js";

class RedirectionController {

    redirectionService = new RedirectionService();

    redirectToLongUrl = async (req, res) => {
        try {
          const { shortUrl } = req.params;
          const data = await this.redirectionService.getLongUrlByShortUrl(shortUrl);
          if (!data) {
            return res.status(404).send({ success: false, message: "URL no encontrada" });
          }
    
          await this.redirectionService.incrementClicks(shortUrl);
    
          res.redirect(data.longUrl);
        } catch (error) {
          res.status(500).send({ success: false, message: error.message });
        }
      };



}

export default RedirectionController;