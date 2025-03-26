const express = require('express');
const dotenv = require('dotenv');
const aluguelRoutes = require('./src/modules/aluguel/routes/index')

dotenv.config()

const port = process.env.PORTA;
const app = express();

app.use(express.json());

app.use(aluguelRoutes)

//Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});