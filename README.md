# Abrigo de Pets

API REST desenvolvida com **Node.js** e **Express** para gerenciar os animais de um abrigo. Os dados são mantidos em memória, então são reiniciados quando o servidor é encerrado.

## Requisitos

- Node.js
- npm

## Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/VictorHUBy/abrigo-de-pets.git
   cd abrigo-de-pets
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie a API:
   ```bash
   npm start
   ```

O servidor ficará disponível em `http://localhost:3000`.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/pets` | Lista todos os animais |
| GET | `/pets/:id` | Busca um animal pelo ID |
| POST | `/pets` | Cadastra um animal |
| PATCH | `/pets/:id` | Atualiza os campos enviados de um animal |
| DELETE | `/pets/:id` | Remove um animal |

## Exemplo de cadastro

Envie uma requisição `POST` para `http://localhost:3000/pets` com o corpo JSON:

```json
{
  "dsNome": "Luna",
  "dsEspecie": "cachorro",
  "nuIdade": 2
}
```

O cadastro exige nome e espécie não vazios e idade numérica maior ou igual a zero.

## Exemplo de atualização

Envie uma requisição `PATCH` para `http://localhost:3000/pets/1`. É necessário informar pelo menos um campo:

```json
{
  "fgAdotado": true
}
```

## Respostas

- `200 OK`: consulta ou atualização realizada.
- `201 Created`: animal cadastrado.
- `204 No Content`: animal removido.
- `400 Bad Request`: identificador ou dados inválidos.
- `404 Not Found`: animal não encontrado.

## Tecnologias

- JavaScript (ES Modules)
- Node.js
- Express

## Observação

Os registros são armazenados em um array na memória e não são persistidos em banco de dados. Ao reiniciar o servidor, a lista volta aos dados iniciais definidos no código.
