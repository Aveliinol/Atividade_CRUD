const express = require('express');
const EnderecoController = require('../controller/index');

const router = express.Router()

router.post('/endereco', EnderecoController.criarEndereco)

router.put('/endereco/:cpf', EnderecoController.editarEndereco)

router.get('/enderecos', EnderecoController.listarEnderecos)

router.get('/endereco/:cpf', EnderecoController.listarEnderecoCPF)

router.get('/endereco/cep/:cep', EnderecoController.listarEnderecoCEP)

router.get('/endereco/cpf/:cpf', EnderecoController.listarEnderecoCliente)


module.exports = router