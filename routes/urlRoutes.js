import { Router } from 'express';
import UrlController from '../controllers/UrlController.js';
import { validateLogin } from '../middlewares/validateLogin.js';
import { validateRole } from '../middlewares/validateRole.js';

const urlRoutes = Router();
const urlController = new UrlController();


urlRoutes.use(validateLogin);
urlRoutes.use(validateRole);

urlRoutes.get('/', urlController.getAllUrls);
urlRoutes.get('/:id', urlController.getUrlById);
urlRoutes.post('/', urlController.createUrl);
urlRoutes.put('/:id', urlController.updateUrl);
urlRoutes.delete('/:id', urlController.deleteUrl);

export default urlRoutes;
