const EnderecoModel = require('../models/index')

class EnderecoController {
    static async criarEndereco(req, res) {
        try {
            const { cpf, cep, numero } = req.body
            if (!cpf || !cep || !numero) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
            }
            const enderecos = await EnderecoModel.criarEnderecoCliente(cpf, cep, numero)
            res.status(201).json({ endereco: enderecos, msg: "Endereço registrado com sucesso" })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message })
        }
    }
    static async editarEndereco(req, res) {
        try {
            const cpf = req.params.cpf
            const { cep, numero } = req.body
            if (!cep || !numero) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
            }
            const enderecos = await EnderecoModel.editarEnderecoCliente(cpf, cep, numero)
            if (enderecos.length === 0) {
                return res.status(404).json({ msg: "Endereço não encontrado" })
            }
            res.status(200).json({ endereco: enderecos, msg: "Endereço alterado com sucesso" })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message })
        }
    }
    static async listarEnderecos(req, res) {
        try {
            const consulta = await EnderecoModel.listarEndereco()
            if (consulta.length === 0) {
                return res.status(400).json({ msg: "Sem dados no Banco" })
            }
            res.status(200).json(consulta)
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message })
        }
    }
    static async listarEnderecoCPF(req, res) {
        try {
            const cpf = req.params.cpf
            const consulta = await EnderecoModel.listarEnderecoPorCPF(cpf)
            if (consulta.length === 0) {
                return res.status(404).json({ msg: "Endereço não encontrado" })
            }
            res.status(200).json(consulta)
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message })
        }
    }
    static async listarEnderecoCEP(req, res) {
        try {
            const cep = req.params.cep
            const consulta = await EnderecoModel.listarEnderecoPorCEP(cep)
            if (consulta.length === 0) {
                return res.status(404).json({ msg: "CEP não encontrado" })
            }
            res.status(200).json(consulta)
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message })
        }
    }
    static async listarEnderecoCliente(req, res) {
        try {
            const cpf = req.params.cpf
            const consulta = await EnderecoModel.listarEnderecoPorCliente(cpf)
            if (endereco.length === 0) {
                return res.status(404).json({ msg: "Cliente não encontrado" })
            }
            res.status(200).json(consulta)
        } catch (error) {
            res.status(500).json({ msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message })
        }
    }

}

module.exports = EnderecoController