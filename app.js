const express = require('express');
const dotenv = require('dotenv');
const { pool } = require('./src/config/database');

dotenv.config();

const port = process.env.PORTA;
const app = express();
app.use(express.json());

const bancoBike = [];

//Listar todos os alugueis
app.get('/bike', async (req, res) => {
    //Tratamento de  exceções
    try {
        const consulta = `select * from aluguel`
        const alugueis = await pool.query(consulta)
        if (alugueis.rows.length === 0) {
            return res.status(200).json({ msg: "Sem alugueis no banco de dados" })
        }
        res.status(200).json(alugueis.rows);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao tenta listar alugueis", erro: error.message })
    }

});

//Listar alugueis pelo id
app.get('/bike/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dados = [id]
        const consulta = `select * from aluguel where id = $1`
        const resultado = await pool.query(consulta, dados)
        if (resultado.rows.length === 0) {
            return res.status(404).json({ msg: "Aluguel não encontrado" })
        }
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao tenta listar aluguel", erro: error.message })
    }
});

//Cadastar aluguel
app.post('/bike', async (req, res) => {
    try {
        const { nome, data_inicio, data_termino, valor, status } = req.body;
        if (!nome || !data_inicio || !data_termino || !valor || !status) {
            return res.status(200).json({ msg: "Todos os campos devem ser preenchidos" })
        }
        const novaBike = [nome, data_inicio, data_termino, valor, status]
        const consulta = `Insert into aluguel(nome, data_inicio, data_termino, valor, status) values($1, $2, $3, $4, $5) returning*`
        await pool.query(consulta, novaBike)
        res.status(201).json({ mensagem: "Aluguel cadastrado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao tenta registrar aluguel", erro: error.message })
    }

});

//Atualizar requisição de aluguel
app.put('/bike/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { novoStatus, novaData_termino } = req.body;
        if (!id) {
            return res.status(404).json({ msg: 'Informe o parametro!' })
        }
        const parametro = [id]
        const consulta = `select * from aluguel where id = $1`
        const resultado = await pool.query(consulta, parametro)
        if (resultado.rows.length === 0) {
            return res.status(404).json({ msg: "Aluguel não encontrado" })
        }
        const dados = [id, novoStatus, novaData_termino]
        const update = `update aluguel set status = $2, data_termino = $3 where id = $1 returning *`
        await pool.query(update, dados);
        res.status(200).json({ msg: 'Aluguel atualizado com sucesso' })
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar aluguel", erro: error.message })

    }
})

//deleta aluguel
app.delete('/bike/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const parametro = [id]
        const consulta = `select * from aluguel where id = $1`
        const resultado = await pool.query(consulta, parametro)
        if (resultado.rows.length === 0) {
            return res.status(404).json({ msg: "Aluguel não encontrado" })
        }
        const dados = [id]
        const deleta = `delete from aluguel where id = $1`
        await pool.query(deleta, dados)

        res.status(200).json({ msg: "Aluguel deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar aluguel", erro: error.message })
    }
})

//Deleta all
app.delete('/bike', async (req, res) => {
    try {
        const consulta = `delete from aluguel`
        await pool.query(consulta)
    } catch (error) {
        resposta.status(500).json({ msg: "Erro ao deletar aluguel", erro: error.message })
    }
})

//Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});