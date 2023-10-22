```bash
📁 entities
  📄 User.ts: entidade que representa o usuário, metodo statico para criar uma instância de usuário
📁 modules
  📁 createUser
    📄 CreateUserController.ts: recebe os dados do usuário e chama o service para criar o usuário.
    📄 CreateUserFactory.ts: possui todas as instâncias necessárias para a criação do usuário. 
                            Aqui é definido qual repositório será utilizado para criar o usuário. 
                            Aqui também eu passo o repositório para dentro do Service, passo o Service para o Controller 
                            e retorno o Controller (que será utilizado na rota) 
    📄 CreateUserService.ts: regra de negócio para a criação do usuário. Essa camada de serviço é agnóstica
                            a forma de criação do usuário, ou seja, não importa se o usuário é criado em memória
                            ou com o prisma, o service só se preocupa em criar o usuário.

📁 repositories
  📁 in-memory
    📄 UsersRepositoryInMemory.ts: implementa os métodos de criação e verificação de usuário em memória. 
  📁 prisma 
    📄 PrismaRepository.ts: implementa os métodos de criação e verificação de usuário com o prisma. 
  📄 IUsersRepositories: duas interfaces uma de criação e outra que virifica se o usuário existe.
                        Essa interface não implementa nada só cria o contrato
📁 routes
  📄 routes.ts: aqui é onde eu chamo o factory que utiliza o handle do controller passando o request e o response.
📄 app.ts: contém as configurações do express e um middleware para tratar os erros e repassar para a camada acima. 
📄 server.ts: aqui eu chamo o app e o server fica escutando na porta 3333. Foi criado um aruiqvo separado para o server
            para que eu possa utilizar a variável app nos testes.      
```

### Vídeo exemplo: https://youtu.be/18Dgf7lb9QA?si=YUy9k1mt0uVqZvE3
