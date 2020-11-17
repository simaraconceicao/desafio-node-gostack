const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository)
  return response.json(repository)
 
 
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const encontraPosicao =  repositories.findIndex(repository=>
    repository.id === id
  )

  if(encontraPosicao === -1){
    return response.status(400).json({error: 'Repository not found'})
  }
  const repository = {
    id,
    title,
    url,
    techs,
    likes:  repositories[encontraPosicao].likes

  }
  repositories[encontraPosicao] = repository

  return response.json(repository)
  
});

app.delete("/repositories/:id", (request, response) => {
 const { id } = request.params
 const encontraPosicao =  repositories.findIndex(repository=>
   repository.id === id
 )

 if(encontraPosicao >= 0){
   repositories.splice(encontraPosicao, 1)
 } else {
   return response.status(400).json({error: 'Repository not found'})
 }

 return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const encontraPosicao =  repositories.findIndex(repository=>
    repository.id === id
  )
  if(encontraPosicao === -1){
    return response.status(400).json({error: 'Repository not found'})
  }

  repositories[encontraPosicao].likes++

  return response.json(repositories[encontraPosicao])
  
});

module.exports = app;
