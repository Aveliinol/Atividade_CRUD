const { pool } = require('../../../config/database');

class Aluguel{
    static async criarAluguel(cpf, data_inicio, data_termino, valor, status){
        const dados = [cpf, data_inicio, data_termino, valor, status]
        const consulta = `Insert into aluguel(cpf, data_inicio, data_termino, valor, status) values($1, $2, $3, $4, $5) returning*`
        const novoAluguel = await pool.query(consulta, dados)
        return novoAluguel.rows
    }
    static async editarAluguel(id, data_termino, status){
        const dados = [id, data_termino, status]
        const consulta = `update aluguel set data_termino = $2, status = $3 where id = $1 returning*`
        const editAluguel = await pool.query(consulta,dados)
        return editAluguel.rows
    }
    static async listarAluguelPorID(id){
        const dados = [id]
        const consulta = `select * from aluguel where id = $1`
        const listar = await pool.query(consulta, dados)
        return listar.rows
 
    }
    static async listarAluguel(){
        const consulta = `select *from aluguel`
        const listar = await pool.query(consulta)
        return listar.rows
    }
    static async deletarAluguelPorID(id){
        const dados = [id]
        const consulta = `delete from aluguel where id = $1 returning*`
        const deletar = await pool.query(consulta, dados)
        return deletar.rows
    }
    static async deletarAluguel(){
        const consulta = `delete from aluguel returning*`
        const deletar = await pool.query(consulta)
        return deletar.rows
    }
}

module.exports = Aluguel