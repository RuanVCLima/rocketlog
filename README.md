# 🚀 Rocketlog

API REST para gerenciamento e acompanhamento de entregas de encomendas.

O Rocketlog foi desenvolvido com Node.js e TypeScript, utilizando uma arquitetura organizada em controllers, routes e middlewares. A aplicação permite cadastrar usuários, autenticar usuários, criar entregas, atualizar o status das entregas e registrar o histórico de movimentações.

## ✨ Funcionalidades

- 👤 Cadastro de usuários
- 🔐 Autenticação utilizando JWT
- 🔒 Controle de acesso baseado em perfil de usuário
- 📦 Cadastro de entregas
- 📋 Listagem de entregas
- 🚚 Atualização do status das entregas
- 📝 Registro de logs das entregas
- 🔎 Consulta do histórico de uma entrega
- ✅ Validação de dados com Zod
- 🔑 Senhas armazenadas utilizando hash com bcrypt
- 🗄️ Persistência de dados utilizando Prisma ORM
- ⚠️ Tratamento centralizado de erros
- 🧪 Configuração para testes automatizados com Jest e Supertest

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- TypeScript
- Express
- Prisma ORM
- JSON Web Token (JWT)
- bcrypt
- Zod
- Jest
- Supertest
- Docker / Docker Compose

## 📁 Estrutura do projeto

```text
rocketlog/
├── prisma/
├── src/
│   ├── controllers/
│   │   ├── deliveries-controllers.ts
│   │   ├── deliveries-status-controller.ts
│   │   ├── delivery-logs-controller.ts
│   │   ├── session-controller.ts
│   │   └── users-controller.ts
│   │
│   ├── middlewares/
│   │   ├── ensure-authenticator.ts
│   │   └── verifyUserAuthorization.ts
│   │
│   ├── routes/
│   │   ├── deliveries-routes.ts
│   │   ├── delivery-logs-routes.ts
│   │   ├── sessions-route.ts
│   │   └── users-routes.ts
│   │
│   ├── database/
│   │   └── prisma.ts
│   │
│   └── ...
│
├── .env
├── .env-example
├── docker-compose.yml
├── jest.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação.

Após realizar o login, a API retorna um token que deve ser enviado nas requisições protegidas através do header:

Authorization: Bearer <token>

O middleware de autenticação valida o token e disponibiliza o ID e o perfil do usuário para as próximas etapas da requisição.

As senhas dos usuários não são armazenadas em texto puro. Durante o cadastro, elas são transformadas em hash utilizando bcrypt.

👥 Controle de acesso

O projeto possui autorização baseada em roles.

Os endpoints relacionados às entregas são protegidos e permitem acesso ao perfil sale, enquanto a consulta de logs pode ser realizada por usuários com perfil sale ou customer.

O middleware verifyUserAuthorization verifica se o usuário autenticado possui uma das roles autorizadas para acessar determinada rota.

📦 Entregas

É possível criar uma nova entrega informando o usuário responsável e a descrição da encomenda.

Exemplo:

POST /deliveries

Body:

{
  "user_id": "UUID_DO_USUARIO",
  "description": "Entrega de documentos"
}

Os dados são validados utilizando Zod antes de serem persistidos no banco de dados.

Também é possível listar as entregas cadastradas:

GET /deliveries

A listagem inclui informações do usuário associado à entrega.

🚚 Status da entrega

As entregas podem possuir os seguintes status:

processing
shipped
delivered

O status pode ser atualizado através de:

PATCH /deliveries/:id/status

Exemplo:

{
  "status": "shipped"
}

Quando o status de uma entrega é atualizado, um registro também é criado no histórico da entrega.

📝 Histórico de entregas

A API permite registrar eventos relacionados às entregas.

POST /delivery-logs

Body:

{
  "delivery_id": "UUID_DA_ENTREGA",
  "description": "Encomenda saiu para entrega"
}

O sistema verifica se a entrega existe e também impede determinadas operações de acordo com o status atual da encomenda.

Para consultar uma entrega e seus respectivos logs:

GET /delivery-logs/:delivery_id/show

A resposta contém informações da entrega, do usuário e dos registros de histórico. Clientes também são impedidos de consultar entregas pertencentes a outros usuários.

| Método | Endpoint                           | Descrição                     | Acesso          |
| ------ | ---------------------------------- | ----------------------------- | --------------- |
| POST   | `/users`                           | Criar usuário                 | Público         |
| POST   | `/sessions`                        | Autenticar usuário            | Público         |
| POST   | `/deliveries`                      | Criar entrega                 | Sale            |
| GET    | `/deliveries`                      | Listar entregas               | Sale            |
| PATCH  | `/deliveries/:id/status`           | Atualizar status              | Sale            |
| POST   | `/delivery-logs`                   | Criar log de entrega          | Sale            |
| GET    | `/delivery-logs/:delivery_id/show` | Consultar entrega e histórico | Sale / Customer |


As rotas são centralizadas através do router principal da aplicação.

⚙️ Como executar o projeto
1. Clone o repositório

git clone <URL_DO_REPOSITORIO>

2. Acesse a pasta

cd rocketlog

3. Instale as dependências

npm install

4. Configure as variáveis de ambiente

Crie um arquivo .env baseado no arquivo:

.env-example

Configure as variáveis necessárias para conexão com o banco de dados e autenticação da aplicação.

5. Configure o banco de dados

Execute as configurações/migrations do Prisma conforme a configuração existente no projeto.

npx prisma migrate dev

6. Execute a aplicação

npm run dev

O projeto possui um script de desenvolvimento configurado com tsx, executando o servidor em modo watch.

🧪 Testes

O projeto utiliza:

Jest
Supertest
ts-jest

Para executar os testes em modo de desenvolvimento:

npm run test:dev

O script de testes está configurado no package.json.

🗄️ Prisma

O projeto utiliza o Prisma Client para comunicação com o banco de dados.

A instância do PrismaClient é centralizada no projeto e, durante o desenvolvimento, as queries podem ser registradas nos logs.

⚠️ Tratamento de erros

A aplicação possui um middleware centralizado para tratamento de erros.

Erros personalizados utilizando AppError retornam o status HTTP correspondente, enquanto erros de validação do Zod retornam 400 juntamente com os detalhes das validações.

📌 Objetivo do projeto

O Rocketlog foi desenvolvido como uma API para praticar e demonstrar conceitos importantes do desenvolvimento backend, incluindo:

Desenvolvimento de APIs REST
TypeScript
Arquitetura baseada em Controllers, Routes e Middlewares
Autenticação e autorização
JWT
Hash de senhas
ORM com Prisma
Validação de dados
Controle de acesso por roles
Tratamento de erros
Testes automatizados
Integração com banco de dados
👨‍💻 Autor

Ruan Victor

Desenvolvido com 💻 e ☕ para estudos e evolução em desenvolvimento backend.

⭐ Se este projeto foi útil para você, considere deixar uma estrela no repositório!
