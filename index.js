import express from "express";

const app = express();
app.use(express.json());

// =========================================== //
//                  DADOS                      //
// =========================================== //

const abrigoAnimais = [
  {
    idPet: 1,
    dsNome: "Rex",
    dsEspecie: "cachorro",
    nuIdade: 3,
    fgAdotado: false,
  },
  {
    idPet: 2,
    dsNome: "Duck",
    dsEspecie: "gato",
    nuIdade: 3,
    fgAdotado: false,
  },
  {
    idPet: 3,
    dsNome: "Nina",
    dsEspecie: "coelho",
    nuIdade: 4,
    fgAdotado: false,
  },
];

let ultimoId = 3;

// =========================================== //
//                  FUNÇÕES                    //
// =========================================== //

function todosAnimais() {
  return abrigoAnimais;
}

function buscarPeloId(id) {
  return abrigoAnimais.find((pet) => pet.idPet === id);
}

function criarAnimal(dados) {
  ultimoId += 1;

  const novoPet = {
    idPet: ultimoId,
    dsNome: dados.dsNome,
    dsEspecie: dados.dsEspecie,
    nuIdade: dados.nuIdade,
    fgAdotado: false,
  };

  abrigoAnimais.push(novoPet);
  return novoPet;
}

function atualizarPet(id, dados) {
  const indice = abrigoAnimais.findIndex((pet) => pet.idPet === id);
  if (indice === -1) return null;

  if (dados.dsNome !== undefined) abrigoAnimais[indice].dsNome = dados.dsNome;
  if (dados.dsEspecie !== undefined) abrigoAnimais[indice].dsEspecie = dados.dsEspecie;
  if (dados.nuIdade !== undefined) abrigoAnimais[indice].nuIdade = dados.nuIdade;
  if (dados.fgAdotado !== undefined) abrigoAnimais[indice].fgAdotado = dados.fgAdotado;

  return abrigoAnimais[indice];
}

function deletarPet(id) {
  const indice = abrigoAnimais.findIndex((pet) => pet.idPet === id);
  if (indice === -1) return false;

  abrigoAnimais.splice(indice, 1);
  return true;
}

// =========================================== //
//                  ROTAS                      //
// =========================================== //

// GET buscar todos
app.get("/pets", (req, res) => {
  const lista = todosAnimais();
  res.status(200).json(lista);
});

// GET buscar um pelo id
app.get("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "identificador deve ser um numero" });
  }

  const pet = buscarPeloId(id);

  if (!pet) {
    return res.status(404).send();
  }

  res.status(200).json(pet);
});

// POST criar pets
app.post("/pets", (req, res) => {
  const { dsNome, dsEspecie, nuIdade } = req.body;

  if (!dsNome || typeof dsNome !== "string" || dsNome.trim() === "") {
    return res.status(400).json({ mensagem: "dsNome é obrigatório e não pode ser vazio" });
  }

  if (!dsEspecie || typeof dsEspecie !== "string" || dsEspecie.trim() === "") {
    return res.status(400).json({ mensagem: "dsEspecie é obrigatório e não pode ser vazio" });
  }

  if (nuIdade === undefined || typeof nuIdade !== "number" || nuIdade < 0) {
    return res.status(400).json({ mensagem: "nuIdade é obrigatório, deve ser um número maior ou igual a 0" });
  }

  const novoPet = criarAnimal({
    dsNome: dsNome.trim(),
    dsEspecie: dsEspecie.trim(),
    nuIdade,
  });

  res.status(201).json(novoPet);
});

// PATCH atualizar so um 
app.patch("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "identificador deve ser um numero" });
  }
  const petExistente = buscarPeloId(id);
  if (!petExistente) {
    return res.status(404).send();
  }

  const { dsNome, dsEspecie, nuIdade, fgAdotado } = req.body;

  const temCampo =
    dsNome !== undefined ||
    dsEspecie !== undefined ||
    nuIdade !== undefined ||
    fgAdotado !== undefined;

  if (!temCampo) {
    return res.status(400).json({ mensagem: "é necessário enviar pelo menos um campo para atualizar" });
  }
  if (dsNome !== undefined) {
    if (typeof dsNome !== "string" || dsNome.trim() === "") {
      return res.status(400).json({ mensagem: "dsNome não pode ser vazio" });
    }
  }
  if (dsEspecie !== undefined) {
    if (typeof dsEspecie !== "string" || dsEspecie.trim() === "") {
      return res.status(400).json({ mensagem: "dsEspecie não pode ser vazio" });
    }
  }
  if (nuIdade !== undefined) {
    if (typeof nuIdade !== "number" || nuIdade < 0) {
      return res.status(400).json({ mensagem: "nuIdade deve ser um número maior ou igual a 0" });
    }
  }

  if (fgAdotado !== undefined) {
    if (typeof fgAdotado !== "boolean") {
      return res.status(400).json({ mensagem: "fgAdotado deve ser true ou false" });
    }
  }
  const atualizacaoDados = {};
  if (dsNome !== undefined) atualizacaoDados.dsNome = dsNome.trim();
  if (dsEspecie !== undefined) atualizacaoDados.dsEspecie = dsEspecie.trim();
  if (nuIdade !== undefined) atualizacaoDados.nuIdade = nuIdade;
  if (fgAdotado !== undefined) atualizacaoDados.fgAdotado = fgAdotado;

  const petAtualizado = atualizarPet(id, atualizacaoDados);

  res.status(200).json(petAtualizado);
});

// DELETE, deletar o animal/pet pelo id
app.delete("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id); //tenta transofrma rem numero

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "identificador deve ser um numero" });
  }

  const remover = deletarPet(id);

  if (!remover) {
    return res.status(404).send();
  }
  res.status(204).send();
});

// =========================================== //
//                  FINAL                      //
// =========================================== //

app.listen(3000, () => {
  console.log("API do Abrigo de Pets rodando na porta 3000");
});
