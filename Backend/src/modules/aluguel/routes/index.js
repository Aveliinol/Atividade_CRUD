const express = require('express');
const AluguelController = require('../controller/index');

const router = express.Router()

router.post('/aluguel', AluguelController.criar)

router.put('/aluguel/:id', AluguelController.editar)

router.get('/alugueis', AluguelController.listarAll)

router. get('/aluguel/:id', AluguelController.listarPorID)

router.delete('/alugueis', AluguelController.deletarAll)

router.delete('/aluguel/:id', AluguelController.deletarPorID)

module.exports = router