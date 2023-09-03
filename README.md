<div align="center">
  
# LABEDDIT API
</div>

<div align="center">
  
## [Documentação de uso da API](https://documenter.getpostman.com/view/27671984/2s9Y5eLyHn)
</div>

## Descrição

A API do LabEddit é uma simulação de como seria implementado o backend de uma rede social, proporcionando a possibilidade de criação de posts e interações de LIKE/DISLIKE em cada postagem, além de permitir a criação de comentários para cada post, possibilitando também a interação de LIKE/DISLIKE nos comentários também.

## Recursos Principais

A API oferece os seguintes recursos:

1. **Cadastro de novos usuários** Permite a criação de um novo usuário na rede. Os dados do usuário serão processados e posteriormente armazenados em um banco de dados. Um token de acesso será gerado e fornecido como resposta.

2. **Entrada de usuários previamente cadastrados:** Permite a conexão de usuários previamente cadastrados. A API realizará uma comparação entre os dados fornecidos pelo usuário e os dados armazenados no banco. Se os dados estiverem corretos, um token de acesso será gerado como resposta.

3. **Criação de um post na rede:** Caso tenha um token de acesso válido, será possível realizar a criação de uma postagem dentro da rede.

4. **Criação de comentários na rede:** Caso tenha um token de acesso válido, será possível a realização de comentários nas postagens existentes na página. 

5. **Visualização dos posts/comentários já criados**: Caso tenha um token de acesso válido, o usuário terá acesso à leitura de todos os posts/comentários realizados na rede. 

6. **Edição de posts/comentários previamente criados:** Caso tenha um token de acesso válido, será possível editar qualquer uma das postagens feitas por este usuário.

7. **Remoção de posts** Caso o usuário logado seja o criador do post, ele poderá realizar a sua remoção. Administradores da rede podem realizar a remoção de qualquer post.

8. **Remoção de comentários** Caso o usuário logado seja o criador do comentário, ele poderá realizar a sua remoção. Administradores da rede podem realizar a remoção de qualquer comentário.

9.  **Interação de LIKE/DISLIKE**: Caso o usuário logado NÃO seja o criador do post/comentário, ele terá a capacidade de realizar a ação de "like" ou "dislike" nos posts/comentários da rede.

##  Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [SQLite 3](https://www.sqlite.org/)
- [Knex](https://knexjs.org/)
- [UUID](https://www.npmjs.com/package/uuid)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- [JWT](https://jwt.io/)
- [ZOD](https://zod.dev/)
- [JEST](https://jestjs.io/)

## Instruções para instalação local

```js
-- Clone a API utilizando o seguinte comando: git clone https://github.com/taleshy1/Labeddit-Backend.git

-- Entre na pasta criada a partir do comando acima.

-- Instale as dependências da aplicação:
  
    (yarn): yarn install || yarn
  
    (npm): npm install || npm i

-- Realize a conexão do banco de dados os arquivo .sql fornecido.

-- Execute a criação das tabelas. Os comandos já estão previamente criados no arquivo labeddit.sql

-- Crie o arquivo de variavies ".env".

-- Configure o arquivo ".env" de acordo com o exemplar ".env.example".

-- Atualize as variaveis em seus respectivos arquivos: 

    PORT -- /src/index.ts  (Essa variavel será a porta utilizada para abrir o servidor local para funcionamento da API)

    DB_FILE_PATH -- /src/database/baseDatabase.ts   (Essa variavel será o path para o seu arquivo Database )

    JWT_KEY -- /src/services/tokenManager.ts    (Essa variavel será a sua senha segura, utilizada no momento de criação da criação do token)

    JWT_EXPIRES_IN -- /src/services/tokenManager.ts    (Essa variavel será o tempo até a expiração do token criado)

    BCRYPT_COST -- /src/services/HashManager.ts    (Essa variavel será a quantidade de ROUNDS utilizada no momento da encriptação do password do usuário)

-- Caso queira executar em modo desenvolvimento, execute o comando abaixo:

    (yarn)
    yarn dev
    
    (npm)
    npm run dev
    
-- Caso queira fazer a build e iniciar em modo "produção", execute o comando abaixo:
    
    (yarn)
    yarn start
    
    (npm)
    npm start

-- Observe no seu terminal para qual endereço e porta estão sendo apontados, depois acesse esse endereço usando um client.
```
