import { Router } from 'express';
import UrlController from '../controllers/UrlController.js';

const urlRoutes = Router();
const urlController = new UrlController();

urlRoutes.get('/', urlController.getAllUrls);

urlRoutes.get('/:id', urlController.getUrlById);

urlRoutes.post('/', urlController.createUrl);

urlRoutes.put('/:id', urlController.updateUrl);

urlRoutes.delete('/:id', urlController.deleteUrl);

export default urlRoutes;
