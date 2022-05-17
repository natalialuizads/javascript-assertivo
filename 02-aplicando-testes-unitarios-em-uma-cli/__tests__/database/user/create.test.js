import { createUser } from 'database/user/create.js';
import * as file from 'database/file.js';
import path from 'database/path.js';
import ROLES from 'constants/roles.js';

jest.mock('database/file.js');
jest.mock('database/path.js');

const usuario = {
  email: 'qualquer@email.com',
  password: 'senha1234',
  userName: 'usuarioQualquer',
  name: 'Usuário',
  lastName: 'Qualquer'
}

afterEach(() => {
  jest.clearAllMocks();
})

beforeEach(() => {
  file.loadDatabase.mockResolvedValueOnce([])
})

afterAll(() => {
  jest.restoreAllMocks();
})

it('Cria usuário corretamente', async () => {
  expect.assertions(4);
  // modifcamos mockImplementation por mockResolvedValue
  file.loadDatabase.mockResolvedValueOnce([])
  const user = await createUser(usuario);

  expect(file.loadDatabase).toHaveBeenCalledTimes(1);
  expect(file.saveDatabase).toHaveBeenCalledTimes(1);
  expect(file.saveDatabase).toHaveBeenCalledWith([user]);
  expect(user).toEqual({
    ...usuario,
    uid: expect.any(String),
    role: ROLES.USER
  })
})

it('Cria usuário corretamente', async () => {
  expect.assertions(4);
  // modifcamos mockImplementation por mockResolvedValue
  file.loadDatabase.mockResolvedValueOnce([])
  const user = await createUser({...usuario, role: ROLES.ADMIN});

  expect(file.loadDatabase).toHaveBeenCalledTimes(1);
  expect(file.saveDatabase).toHaveBeenCalledTimes(1);
  expect(file.saveDatabase).toHaveBeenCalledWith([user]);
  expect(user).toEqual({
    ...usuario,
    uid: expect.any(String),
    role: ROLES.ADMIN
  })
})

