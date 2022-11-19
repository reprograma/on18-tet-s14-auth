[POST] "/cozinha/usuarios/criar"
409: conflito
201: cadastra novo usuário
500: Internal Server Error

[POST] "/cozinha/usuarios/login
404: not found
401: Unauthorized
200: retorna token e mensagem que usuário está logado

[GET] "/cozinha/buscar" 
200: retorna todas as cozinhas cadastradas.
500: Internal Server Error

[GET] "/cozinha/buscar/:id 
parametro: id
200: retornar a cozinha com o id informado
404: not found (nenhuma cozinha encontrada para esse id)

[POST] "/cozinha/cadastrar" 
201: cadastra uma nova cozinha
400: Bad Request (campo obrigatório)
409: conflito (informação já existe no banco)

[DELETE] "/cozinha/deletar/:id"
parametro: id
200: deletar uma cozinha por id específico
401: Unauthorized

[PATCH] "/cozinha/atualizar/:id" 
parametro: id
200: alterar informação específica por id específico 
400: Bad request