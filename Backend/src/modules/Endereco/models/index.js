const {pool} = require('../../../config/database')
const axios = require('axios')

class EnderecoModel{
    static async criarEnderecoCliente(cpf, cep, numero){
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, complemento, bairro, localidade, uf} = res.data
        const dados = [
            cpf,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            uf    
        ]
        const consulta = `Insert into enderecos(cpf, cep, logradouro, numero, complemento, bairro, localidade, uf)
        values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async editarEnderecoCliente(cpf, cep, numero){
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, complemento, bairro, localidade, uf} = res.data
        const dados = [
            cpf,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            uf    
        ]
        const consulta = `update enderecos set cep = $2, logradouro = $3, numero = $4, complemento = $5, bairro = $6,
        localidade = $7, uf = $8 where cpf = $1 returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEndereco(){
        const consulta = `select *from enderecos`
        const resultado = await pool.query(consulta)
        return resultado.rows
    }
    static async listarEnderecoPorCPF(cpf){
        const dados = [cpf]
        const consulta = `select *from enderecos where cpf = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecoPorCEP(cep){
        const dados = [cep]
        const consulta = `select *from enderecos where cep = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecoPorCliente(cpf){
        const dados = [cpf]
        const consulta = `select cliente.*, enderecos.* from cliente
        join enderecos on cliente.cpf = enderecos.cpf
        where cliente.cpf = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

}

module.exports = EnderecoModel