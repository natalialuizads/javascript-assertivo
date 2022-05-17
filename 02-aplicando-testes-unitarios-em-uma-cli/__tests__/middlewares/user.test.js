import { isAdminMiddleware } from "middlewares/user.js";
import ROLES from 'constants/roles.js';

const mockUsuario = {
  uid: 'abc-1234',
  userName: 'nomeDoUsuario',
  name: 'nome',
  lastName: 'DeUsuario',
  email: 'email.nome@usuario.com',
  password: 'senhasupersecreta'
}

it('Deve retornar os dados do usuário caso a role seja ADMIN', () => {
  const mockAdmin = {
    user: {
      ...mockUsuario,
      role: ROLES.ADMIN,
    }
  }

  //verificamos se o retorno do middleware é igual ao valor que informamos
  const retorno = isAdminMiddleware(mockAdmin);
  expect(retorno).toEqual(mockAdmin);
})

it('Deve disparar um erro caso o usuário não seja ADMIN', () => {
  const mockUser = {
    user: {
      ...mockUsuario,
      role: ROLES.USER,
    }
  }

  const retorno = () => isAdminMiddleware(mockUser);
  expect(retorno).toThrow('Você não possui permissão para executar essa operação.')
})