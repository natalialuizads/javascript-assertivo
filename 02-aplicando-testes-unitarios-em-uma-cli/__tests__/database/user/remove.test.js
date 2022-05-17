import { getUserByUid } from 'database/user/read.js';
import { loadDatabase } from 'database/file.js';
import { removeUser } from 'database/user/remove.js';

jest.mock('database/path.js');
jest.mock('database/file.js');

const mockUsuario = {
  uid: 'abc-1234',
  userName: 'nomeDousuario',
  name: 'nome',
  lastName: 'DoUsuario',
  email: 'email.nome@usuario.com',
  password:'senhasuperescreta',
  role: 'USER'
}
loadDatabase.mockResolvedValue([mockUsuario])

describe('Remove User', () => {
  it('Remove o usuario', async() => {
    expect.assertions(1);
    const usuario = await getUserByUid('abc-1234');
    const usuarioRemovido = await removeUser('abc-1234')
    expect(usuario).toEqual(usuarioRemovido)
 })
 
 it('Dispara um erro caso usuário não seja encontrado', async() => {
  expect.assertions(1);
  try {
    await removeUser('uid-não-existente')
  } catch(err){
    expect(err.message).toEqual('Usuário com UID uid-não-existente não existe');
  }
 })
})