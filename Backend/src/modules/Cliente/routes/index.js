const express = require('express');
const ClienteController = require('../controller/index')

const router = express.Router()

router.post('/cliente', ClienteController.criar)

router.put('/cliente/:id', ClienteController.editar)

router.get('/clientes', ClienteController.listarClientes)

router.get('/cliente/:id', ClienteController.listarClientePorID)

router.delete('/clientes', ClienteController.deletarClientes)

router.delete('/cliente:id', ClienteController.deletarClientePorID)

module.exports = router