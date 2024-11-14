import { Router } from "express";
import RedirectionController from "../controllers/RedirectionController.js";

const redirectionRoutes = Router();

const redirectionController = new RedirectionController();

redirectionRoutes.get("/:shortUrl", redirectionController.redirectToLongUrl);

export default redirectionRoutes;