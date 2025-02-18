const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
const port = process.env.port;
app.use(express.json());

const bancoBike = [];

//Listar todos os alugueis
app.get('/Bike', (req, res) => {
    try {
        if(bancoBike.length === 0){
            return res.status(200).json({msg:"Sem alugueis no banco de dados"})
        }
        res.status(200).json(bancoBike)
    } catch (error) {
        res.status(500).json({msg:"Erro ao tenta listar alugueis"})
    }
})

//Listar alugueis pelo id
app.get('/Bike/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const bike = bancoBike.find(i => i.id === id);
    if(!bike){
        return res.status(200).json({msg:"Aluguel não encontrado"})}
    res.status(200).json(bike)  
    } catch (error) {
        res.status(500).json({msg:"Erro ao tenta listar aluguel"})  
    }
})

//Cadastar aluguel
app.post('/Bike', (req, res) => {
    try {
    const {id, cliente, dataI, dataT, valor, status} = req.body;
    if (!id || !cliente || !dataI || !dataT || !valor || !status){
        return res.status(200).json({msg:"Todos os campos devem ser preenchidos"})}
    const novaBike = {id, cliente, dataI, dataT, valor, status}
        bancoBike.push(novaBike);
        res.status(201).json({msg:"Aluguel cadastrado com sucesso"})
    } catch (error) {
        res.status(500).json({msg:"Erro ao tenta registrar aluguel"})  
    }
})

//Atualizar requisição de aluguel
app.put('/bike/:id', (req, res) => {
    try {
    const id = parseInt(req.params.id);
    const {novoStatus, novaDataT} = req.body;
    if(!id){
        return res.status(404).json({msg:"Informe um parametro"})}
    const bike = bancoBike.find( i => i.id === id);
    if(!bike){
        return res.status(404).json({msg:"Aluguel não encontrado"})}
    if(bike){
        bike.status = novoStatus,
        bike.dataT = novaDataT;
    }
     res.status(200).json({msg:"Aluguel atualizado com sucesso"}

     )
    } catch (error) {
        res.status(500).json({msg:"Erro ao tenta atualizar aluguel"}) 
    }
})

//deleta aluguel
app.delete('/Bike/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const bike = bancoBike.findIndex( i => i.id === id);
        if(bike === -1){
            return res.status(200).json({msg:"Aluguel não encontrado"})}
        bancoBike.splice(bike, 1)
        res.status(200).json({msg:"Aluguel deletado com sucesso"})  
    } catch (error) {
        res.status(500).json({msg:"Erro ao deletar aluguel"}) 
    }  
})

//Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });