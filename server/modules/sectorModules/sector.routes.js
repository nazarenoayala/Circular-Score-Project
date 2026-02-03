import express from 'express';
import sectorController from './sector.controller.js';
import {verifyToken} from '../../middlewares/verifyToken.js';

const routes = express.Router();

//Ruta para traer todos los sectores
routes.get('/allSectors', sectorController.selectAllSectors);

//Ruta para crear nuevo sector
routes.post('/create', verifyToken, sectorController.createSector);

//Ruta para modificar un sector
routes.put('/update/:id', verifyToken, sectorController.updateSector);

//Ruta para eliminar un sector
routes.delete('/delete/:id', verifyToken, sectorController.deleteSector);

export default routes;