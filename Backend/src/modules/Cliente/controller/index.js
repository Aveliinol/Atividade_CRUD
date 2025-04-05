const ClienteModel = require('../models/index')

class ClienteController{
    static async criar(req, res){
        try {
            const {cpf, nome, contato} = req.body
            if (!cpf || !nome || !contato){
                return res.status(400).json({msg:"Todos os campos devem ser preenchidos"})
            }
            const novoCliente = await ClienteModel.criarCliente(cpf, nome, contato)
              res.status(201).json({Cliente: novoCliente, msg:"Cliente registrado com sucesso"})
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async editar(req, res){
        try {
            const id = req.params.id
            const {nome, contato} = req.body
            if(!id){
                return res.status(400).json({msg: "Informe o ID"})
            }
            const editCliente = await ClienteModel.editarCliente(id, nome, contato)
            if(editCliente.length === 0){
                return res.status(404).json({msg:"Cliente não encontrado"})
            }
               res.status(200).json({Cliente: editCliente, msg:"Cliente atualizado com sucesso"})
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async listarClientes(req, res){
        try {
            const consulta = await ClienteModel.listarCliente()
            if(consulta.length === 0){
                return res.status(400).json({msg:"Sem dados no banco"})
            }
                res.status(200).json(consulta)
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async listarClientePorID(req, res){
         try {
            const id = req.params.id
            const consulta = await ClienteModel.listarClientePorID(id)
            if(consulta.length === 0){
                return res.status(404).json({msg:"Cliente não encontrado"})
            }
               res.status(200).json(consulta)
         } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
         }
    }
    static async deletarClientes(req, res){
        try {
            await ClienteModel.deletarCliente()
                res.status(200).json({msg:"Clientes deletados"})
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async deletarClientePorID(req, res){
        try {
            const id = req.params.id
            const consulta = await ClienteModel.deletarClientePorID(id)
            if(consulta.length === 0){
                return res.status(404).json({msg:"Cliente não encontrado"})
            }
                 res.status(200).json({msg:"Cliente excluido com sucesso"})
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
}

module.exports = ClienteController