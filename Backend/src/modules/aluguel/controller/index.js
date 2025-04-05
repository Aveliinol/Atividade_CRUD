const aluguelModel = require('../models/index')

class AluguelController{
    static async criar(req, res){
        try {
            const { cpf, data_inicio, data_termino, valor, status } = req.body;
            if (!cpf || !data_inicio || !data_termino || !valor || !status) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
            }
            const novoAluguel = await aluguelModel.criarAluguel(cpf, data_inicio, data_termino, valor, status)
            res.status(201).json({ msg: "Aluguel registrado com sucesso", Aluguel:novoAluguel })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao cadastrar Aluguel", erro: error.message })
        }
    }
    static async editar(req, res){
        try {
            const id = req.params.id;
            const { data_termino, status } = req.body;
            if (!id) {
                return res.status(400).json({ msg: 'Informe o parametro!' })
            }
            if (!data_termino || !status) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
            }
            const editAluguel = await aluguelModel.editarAluguel(id, data_termino, status)
            if(editAluguel.length === 0){
                return res.status(404).json({ msg: "Aluguel não encontrado" })
            }
            res.status(200).json({msg:"Aluguel atualizado com sucesso", aluguel: editAluguel})
    
        } catch (error) {
            res.status(500).json({ msg: "Erro ao editar Aluguel", erro: error.message })
        }
    }
    static async listarPorID(req, res){
        try {
            const id = req.params.id;
            const listar = await aluguelModel.listarAluguelPorID(id)
            if(listar.length === 0){
                return res.status(404).json({ msg: "Aluguel não encontrado" })
            }
            res.status(200).json(listar)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar aluguel", erro: error.message })
        }
    }
    static async listarAll(req, res){
        try {
            const consulta = await aluguelModel.listarAluguel()
            if (consulta.length === 0) {
                return res.status(400).json({ msg: "Sem dados no Banco" })
            }
            res.status(200).json(consulta)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar aluguel", erro: error.message })
        }

    }
    static async deletarPorID(req, res){
        try {
            const id = req.params.id;
            const deleta = await aluguelModel.deletarAluguelPorID(id)
            if(deleta.length === 0){
                return res.status(404).json({ msg: "Aluguel não encontrado" })
            }
            res.status(200).json({ msg: "Aluguel deletado com sucesso" })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar aluguel", erro: error.message })
        }
    }
    static async deletarAll(req, res){
        try {
            await aluguelModel.deletarAluguel()
            res.status(200).json({ msg: "Alugueis excluídos com sucesso" })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao excluir alugueis", erro: error.message })
        }
    }
}

module.exports = AluguelController