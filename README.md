<h1 align="center">
  <img src="assets/reprograma-fundos-claros.png" alt="logo reprograma" width="500">
</h1>

# Tema da Aula

Turma Online X - Todas em Tech  | Back-end | Semana 14 | 2022 | Professora Mayhhara Morais

### Instruções
Antes de começar, vamos organizar nosso setup.
* Fork esse repositório 
* Clone o fork na sua máquina (Para isso basta abrir o seu terminal e digitar `git clone url-do-seu-repositorio-forkado`)
* Entre na pasta do seu repositório (Para isso basta abrir o seu terminal e digitar `cd nome-do-seu-repositorio-forkado`)
* Para executar este projeto, você deverá ter instalado o Node.js e as dependências do npm. Será necessário ter acesso ao MongoAtlas. Além disso, iremos fazer requisições na API com a plataforma Postman.
Após clonar o projeto, execute o comando abaixo:
- `$ npm install`


-----------------------------------------------------------------------------------------------
## Autenticação

Este projeto já possui rotas organizadas e integração com o banco de dados. O próximo passo agora é criar o processo de autenticação (conferia o fluxo de autenticação logo abaixo).

Segue as orientações

-----------------------------------------------------------------------------------------------
### Fluxo autenticação

🚩 **Criação de usuária**<br /> 
Uma usuária é criada e sua senha é armazenada como um hash (usando o bcrypt)

🚩 **Login da usuária**<br /> 
Na request de login, no body da request são enviados os dados necessários para autenticação (email e senha, por exemplo)

🚩 **Autenticação da usuária**<br /> 
A senha é verificada com a do banco, se for igual, um token é gerado como resposta à requisição. No front, esse token é armazenado

🚩 **Autorização de visualização**<br /> 
Com o login realizado, a cada nova requisição o token é enviado no body da requisição permitindo a autorização de visualização

-----------------------------------------------------------------------------------------------
### Criar rota para criação de users

1. Criar rota para criar user em userRoute.js
`$ router.post('/', controller.create);`

2. Criar model de users com id, nome, email e senha

3. Criar método no controller para criar users

4. Criar um user de teste via Postman

-----------------------------------------------------------------------------------------------
### Criptografar senha dos users

1. Instalar bcrypt
`$ npm install bcrypt`

2. Fazer require do bcrypt no `usersController.js`
`$ const bcrypt = require('bcrypt');`

3. Gerar hash com senha recebida no body da request
`$ bcrypt.hashSync(request.body.senha, 10);`

~~~ javascript
const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const newUser = new UserSchema(req.body)

    try {
      const savedUser = await newUser.save()

        res.status(200).json({
            message: "User adicionado com sucesso!",
            savedUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
~~~

4. Criar novo user no banco com a senha hasherizada e o login (email) recebido no body da request

-----------------------------------------------------------------------------------------------
### Criar rota de login

1. Criar rota de login em `userRoute.js`
`$ router.post('/login', controller.login);`

2. Buscar user a partir do email recebido na request, e mostrar um erro 401 caso não encontre
`$ userSchema.findOne({ email: req.body.email }, function(error, user) {...}`

~~~ javascript
  UserSchema.findOne({ email: req.body.email }, (error, user) => {
      if(!user) {
          return res.status(401).send({
              message: "User não encontrado",
              email: `${req.body.email}`
          })
      }
  })
~~~

3. Comparar senha de user encontra com a senha recebida via request, e mostrar um erro 401 caso seja diferente
`$ bcrypt.compareSync(request.body.senha, userFound.senha);`

~~~ javascript
  const validPassword = bcrypt.compareSync(req.body.password, user.password)

  if(!validPassword) {
    return res.status(401).send({
        message: "Login não autorizado"
    })
  }
~~~ 

4. Instalar "jsonwebtoken" via npm install e fazer require do pacote JWT
`$ const jwt = require('jsonwebtoken');`

5. Importar SECRET (passo abaixo) e gerar token JWT a partir do nome e secret e devolver na request
`$ jwt.sign({ name: user.name }, SECRET);`

~~~ javascript
  const token = jwt.sign({ name: user.name }, SECRET)
~~~

6. Enviar uma resposta para a requisição

~~~ javascript
    res.status(200).send({
        message: "Login autorizado",
        token
    })
~~~
-----------------------------------------------------------------------------------------------

### Criar rota autenticada

1. Gerar chave pelo https://travistidwell.com/jsencrypt/demo/ e guardar a chave pública *ou* através do comando 
`$ echo -n 'minhasecret' | base64` 
e guardar o valor do base64

2. Instalar dotenv-safe
`$ npm install dotenv-safe`

3. Criar arquivo .env.example e .env, ambos com chave chamada SECRET
`$ SECRET=secret_aqui_sem_aspas`

4. Criar variável contendo a SECRET em userController.js
`$ const secret = process.env.SECRET`

5. Criar método de autenticação em `getAll`

6. Pegar o header de autorização e enviar uma mensagem de erro 401 quando vir vazio
`$ const authHeader = request.get('authorization');`

~~~javascript
const getAll = async (req, res) => {
  const authHeader = req.get('authorization')
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send("Erro no header")
  }
    
  UserSchema.find(function (err, users) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
      res.status(200).send(users)
  }) 
}
~~~

9. Passar bearer token no header de autenticação via Postman
`$ Bearer TOKEN_JWT_AQUI`

10. Verificar token JWT e enviar uma mensagem de erro 403 caso seja inválido
`$ jwt.verify(token, SECRET, (error) => {...});`

Antes de tudo, precisamos importar a biblioteca jwt no controller 
`$ const jwt = require('jsonwebtoken');`

Agora sim, podemos aplicar o método verify e verificar se tudo está pegando corretamente. 

~~~javascript
jwt.verify(token, SECRET, function(erro) {
  if (err) {
    return res.status(403).send('Não autorizado');
}
~~~

### Exercícios 
* [Exercicio para sala](https://github.com/mflilian/repo-example/tree/main/exercicios/para-sala)
* [Exercicio para casa](https://github.com/mflilian/repo-example/tree/main/exercicios/para-casa)

### Material da aula 
[Slide](https://github.com/reprograma/on18-tet-s14-auth/tree/main/material)

### Links Úteis
- [O que é um hash](https://www.voitto.com.br/blog/artigo/o-que-e-hash-e-como-funciona)
- [JWT e tokens](https://www.wellingtonjhn.com/posts/entendendo-tokens-jwt/)
- [OAuth](https://canaltech.com.br/seguranca/o-que-e-o-protocolo-oauth/)
- [Criptografia Simetrica X Assimetrica](https://blog.mailfence.com/pt/criptografia-simetrica-x-assimetrica-qual-e-a-diferenca/)



<p align="center">
Desenvolvido com :purple_heart:  
</p>

