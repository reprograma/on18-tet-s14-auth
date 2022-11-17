<h1 align="center">
  <img src="https://1.bp.blogspot.com/_GgAnycMqxiM/S-9Eszgk4EI/AAAAAAAAAPs/Tl4JmOlH7wE/s1600/cozinha+comunitaria.JPG" alt="uma parede e portão com uma placa escrito o nome do local" width="500">
</h1>


# Projeto: Cozinha Comunitária 

O projeto é um sistema de cadastro de Cozinhas comunitárias que existem em cada região. 
O objetivo do projeto é incentivar as pessoas a se alimentarem melhor e conhecerem opções de alimentações mais saudáveis e custos mais baixos.

A empresa Cozinha Comunitária disponibiliza cursos sobre alimentação saudável, horta comunitária e regional com valores acessíveis e distribuem cestas básicas para famílias em situações vulneráveis. Além de contarem com chefes de cozinhas e voluntários que abrem os refeitórios do espaço para alimentarem pessoas e crianças aos finais de semana.

## Tecnologias que vamos usar:
| Ferramenta | Descrição |
| --- | --- |
| `javascript` | Linguagem de programação |
| `nodejs` | Ambiente de execução do javascript|
| `express` | Framework NodeJS |
| `dotenv` | Dependência para proteger dados sensíveis do projeto|
| `mongoose` | Dependência que interage com o MongoDB para a conexão da database, criação do model e das collections|
| `nodemon` | Dependência que observa as atualizações realizadas nos documentos para rodar o servidor automaticamente|
| `npm ou yarn` | Gerenciador de pacotes|
| `MongoDb` | Banco de dado não relacional orietado a documentos|
| `MongoDb Compass ou Mongo Atlas` | Interface gráfica para verificar se os dados foram persistidos|
 `Insomnia ou Postman` | Interface gráfica para realizar os testes|

 <br>
<br>

## 📁 Arquitetura 

```
 📁 Projeto
   |
   |-  📁 src
   |    |
        |- 📁 📄 app.js
   |    |- 📁 database
   |         |- 📄 moogoseConnect.js
   |
   |    |- 📁 controllers
   |         |- 📄 CozinhaController.js
   |
   |    |- 📁 models
   |         |- 📄 CozinhaModel.js
   |
   |    |- 📁 routes
   |         |- 📄 CozinhaRoutes.js 
   |
   |- 📄 .env
   |- 📄 .env.example
   |- 📄 .gitignore
   |- 📄 package
   |- 📄 server.js

```

<br>
<br>

# Contrato da API

### Requisitos 
- [ ] GET "**/cozinha**" Deverá retornar todas as cozinhas cadastradas.
- [ ] GET **"/cozinha/[id]** Deverá retornar a cozinha com o id informado.
  
- [ ] POST   "**/cozinha**" Deverá criar uma "cozinha"

- [ ] DELETE   "/cozinha/[ID]" Deverá deletar uma cozinha por id específico e retorna mensagem;

- [ ] PATCH  "/cozinha/[ID]" Deverá alterar informação específica por id específico e retorna o cadastro atualizado;

### Regras de negócio

- [ ]  Não poderá existir cozinhas com o mesmo cnpj;
- [ ]  Não poderá existir cozinhas com o mesmo nome no mesmo bairro;

<br>
<br>

## Dados para Collection Cozinha

- _id: autogerado e obrigatório;
- nome: texto e obrigatório;
- cnpj: numero e obrigatorio;
- É uma iniciativa privada? : Boolean
- endereco objeto com: 
  - cep: string e obrigatório, 
  - rua: string e obrigatório, 
  - numero: number e obrigatório, 
  - complemento: string e opcional, 
  - referencia: string e opcional, 
  - estado: string e obrigatório, 
  - cidade: string e obrigatório, 
  - bairro: string e obrigatório;
- bairros que atuam: array;
- site: texto e não obrigatório;
- atividades disponíveis: array;
- Pessoa responsável pela cozinha: string e obrigatório;


### API deve retornar seguinte JSON de exemplo:

```javascript
[
  {
    _id: new ObjectId("62ab7c861ff392ef188b1100"),
    nome: 'Cozinha Sabores e saberes Milares',
    cnpj: '01984920/0001-12',
    telefone: '1132331232'
    iniciativa_privada: true,
    endereco: {
      cep: '03563050',
      rua: 'Avenida São Miguel', 
      numero: 2001, 
      complemento: '', 
      referencia: 'Próximo da Praça da paz',
      estado: 'São Paulo', 
      cidade: 'São Paulo',
      bairro: 'Jardim São Miguel'
    },
    bairros_atuantes: ['São Miguel', 'Guainases', 'Itaquera'],
    site: 'https://www.cozinhasabores.com.br',
    atividades_disponiveis: ['Cursos de cozinha Brasileira', 'Restaurante solidário'],
    pessoa_responsavel: 'Thaysa'
    createdAt: 2022-11-05T09:00:02.076Z,
    updatedAt: 2022-11-05T18:00:02.076Z,
    __v: 0
  }
]
```