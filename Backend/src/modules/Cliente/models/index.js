const {pool} = require('../../../config/database')

class ClienteModel{
    static async criarCliente(cpf, nome, contato){
        const dados = [cpf, nome, contato]
        const consulta = `Insert into cliente (cpf, nome, contato) values($1, $2, $3) returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async editarCliente(id, nome, contato){
        const dados = [id, nome, contato]
        const consulta = `update cliente set nome = $2, contato = $3 where id = $1 returning*`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
}
