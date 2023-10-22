import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserService } from './CreateUserService'

describe('Create User', () => {
  let usersRepository: IUsersRepository
  let createUserService: CreateUserService

  beforeAll(() => {
    // chamando o repositorio necessário para o service
    usersRepository = new UsersRepositoryInMemory()
    // chamando o execute do service
    createUserService = new CreateUserService(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const userData: User = {
      email: 'user@example.com',
      username: 'john.doe',
      name: 'John Doe',
    }

    const user = await createUserService.execute(userData)

    expect(user).toHaveProperty('id')
    expect(user.email).toBe('user@example.com')
  })

  it('should not be able to create an existing user', async () => {
    const userData: User = {
      email: 'user-existing@example.com',
      username: 'john.existing',
      name: 'John Doe',
    }

    /**
     * para verificar se o usuário já existe eu vou criálo uma vez
     * e depois experar que ao criar um usuário com as mesmas informações
     * ele rejeite e gere um erro exatamente como está no service.
     */
    await createUserService.execute(userData)

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new Error('User already exists!'),
    )
  })
})
