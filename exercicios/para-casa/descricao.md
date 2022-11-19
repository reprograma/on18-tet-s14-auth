<h1 align="center">
  <img src="https://www.radiosucessofm.net/storage/images/cache/e1f4bab42020091575d2d985.jpg" alt="uma parede e portão com uma placa escrito o nome do local" width="500">
</h1>

# Projeto: Ler é saber

O projeto é um sistema de cadastro de bibliotecas que existem em cada região. 
O objetivo do projeto é incentivar as pessoas a lerem e estimular as crianças a criarem hábitos de leitura, procurando Bibliotecas comunitárias próximas de sua casa.

A empresa Ler é saber tem espaços amplos, seguindo todos os protocolos de saúde, para as pessoas irem ler e se sentirem confortáveis naquele espaço. Contam com atividades como contação de histórias, saraus e doações de livros.

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
   |         |- 📄 BibliotecaController.js
   |
   |    |- 📁 models
   |         |- 📄 BibliotecaModel.js
   |
   |    |- 📁 routes
   |         |- 📄 BibliotecaRoutes.js 
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
- [ ] GET "**/biblioteca**" Deverá retornar todas as bibliotecas cadastradas.
- [ ] GET **"/biblioteca/[id]** Deverá retornar a biblioteca com o id informado.
  
- [ ] POST   "**/biblioteca**" Deverá criar uma biblioteca

- [ ] DELETE   "/biblioteca/[ID]" Deverá deletar uma biblioteca por id específico e retorna mensagem;

- [ ] PATCH  "/biblioteca/[ID]" Deverá alterar informação específica por id específico e retorna o cadastro atualizado;

### Regras de negócio

- [ ]  Não poderá existir bibliotecas com o mesmo cnpj;
- [ ]  Não poderá existir bibliotecas com o mesmo nome no mesmo bairro;


<br>
<br>

## Dados para Collection Biblioteca

- _id: autogerado e obrigatório;
- nome: texto e obrigatório;
- cnpj: string e obrigatorio;
- telefone: string;
- É uma iniciativa privada? : Boolean
- endereco: objeto com: 
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
- Pessoa responsável pela biblioteca: string e obrigatório;


### API deve retornar seguinte JSON de exemplo:

```javascript
[
  {
    _id: new ObjectId("62ab7c861ff392ef188b1100"),
    nome: 'Biblioteca Saiba Mais',
    cnpj: '01984920/0001-12',
    telefone: '1132331232'
    iniciativa_privada: true 
    [ 'Static' ],
    endereco: {
      cep: '03563050',
      rua: 'Avenida Paulista', 
      numero: 12, 
      complemento: 'Condomínio Sucesso, Apartamento 3A', 
      referencia: 'Próximo do Mercado Mini Extra',
      estado: 'São Paulo', 
      cidade: 'São Paulo',
      bairro: 'Paulista'
    },
    bairros_atuantes: ['Jardim Paulista', 'Butantã', 'Pinheiros'],
    site: 'https://www.saibamais.com.br',
    atividades_disponiveis: ['Espaço leitura', 'Doação de Livros'],
    pessoa_responsavel: 'Samanta'
    createdAt: 2022-11-05T09:00:02.076Z,
    updatedAt: 2022-11-05T18:00:02.076Z,
    __v: 0
  }
]
```