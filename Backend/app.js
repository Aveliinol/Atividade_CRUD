const express = require('express');
const dotenv = require('dotenv');
const aluguelRoutes = require('./src/modules/aluguel/routes/index')
const clienteRoutes = require('./src/modules/Cliente/routes/index')
const enderecoRoutes = require('./src/modules/Endereco/routes/index')

dotenv.config()

const port = process.env.PORTA;
const app = express();

app.use(express.json());

app.use(clienteRoutes)
app.use(aluguelRoutes)
app.use(enderecoRoutes)

//Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});