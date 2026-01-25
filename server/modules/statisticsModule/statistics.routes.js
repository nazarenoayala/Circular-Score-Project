// TODO -> MÓDULO DONDE VAMOS A HACER TODAS LAS CONSULTAS SOBRE ESTADÍSTICAS Y ANÑALISIS DE DATOS DE LA EMPRESA
import express from 'express';
import statisticsController from './statistics.controller.js';

const routes = express.Router();

// Ruta para obtener los resultados más recientes de cada test ODS por EMPRESA (token para rescatar user_id);
routes.get('/allRecentResults', statisticsController.getAllRecentResults);

// Ruta para obtener el histórico de 1 test:
routes.get('/oneTestHistory/:test_id', statisticsController.getHistoricFromOneTest)

export default routes;