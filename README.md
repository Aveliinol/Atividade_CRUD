# Atividade CRUD - README

## Descrição
Este projeto é uma aplicação CRUD simples para gerenciar alugueis de bicicletas. Ele utiliza o framework Express para criar uma API RESTful.

## Estrutura de Arquivos
- `app.js`: Este arquivo contém a lógica principal da aplicação, incluindo as rotas para listar, registrar, atualizar e deletar alugueis de bicicletas.
- `req.http`: Este arquivo contém exemplos de requisições HTTP para testar a API utilizando um cliente HTTP como o VSCode REST Client ou Postman.

## Endpoints da API
### Listar todos os alugueis
- **Método:** GET
- **URL:** `/Bike`
- **Descrição:** Lista todos os alugueis de bicicletas.

### Listar aluguel pelo ID
- **Método:** GET
- **URL:** `/Bike/:id`
- **Descrição:** Lista um aluguel específico pelo ID.

### Registrar aluguel
- **Método:** POST
- **URL:** `/Bike`
- **Descrição:** Registra um novo aluguel de bicicleta.
- **Body Exemplo:**
    ```json
    {
        "id": 1,
        "cliente": "Cleiton",
        "dataI": "2025-18-02, 17:00",
        "dataT": "2025-18-02, 20:00",
        "valor": 70,
        "status": "ativo"
    }
    ```

### Atualizar aluguel
- **Método:** PUT
- **URL:** `/Bike/:id`
- **Descrição:** Atualiza o status e a data de término de um aluguel existente.
- **Body Exemplo:**
    ```json
    {
        "novoStatus": "atrasado",
        "novaDataT": "2025-18-02, 21:00"
    }
    ```

### Deletar aluguel
- **Método:** DELETE
- **URL:** `/Bike/:id`
- **Descrição:** Deleta um aluguel específico pelo ID.

## Como Executar
1. Certifique-se de ter o Node.js instalado.
2. Instale as dependências com `npm install`.
3. Crie um arquivo `.env` na raiz do projeto e defina a variável `port` com o número da porta desejada.
4. Inicie o servidor com `node app.js`.
5. Utilize um cliente HTTP para testar os endpoints definidos no arquivo `req.http`.

## Contato
Para mais informações, entre em contato com o desenvolvedor.
