const express = require('express');
const AluguelController = require('../controller/index');

const router = express.Router()

router.get('/bike', AluguelController.listarAll)

router. get('/bike/:id', AluguelController.listarPorID)

router.post('/bike', AluguelController.criar)

router.put('/bike/:id', AluguelController.editar)

router.delete('/bike', AluguelController.deletarAll)

router.delete('/bike/:id', AluguelController.deletarPorID)

module.exports = router