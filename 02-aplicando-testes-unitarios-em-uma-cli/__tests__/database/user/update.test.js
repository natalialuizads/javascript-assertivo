import { loadDatabase } from "database/file.js";
import { updateUserByUid } from 'database/user/update.js';

jest.mock("database/path.js");
jest.mock("database/file.js");
const mockUsuario = {
  uid: "abc-1234",
  userName: "nomeDousuario",
  name: "nome",
  lastName: "DoUsuario",
  email: "email.nome@usuario.com",
  password: "senhasuperescreta",
  role: "USER",
};
loadDatabase.mockResolvedValue([mockUsuario]);

describe("Update User", () => {
  it("Deve atualizar as informações do usuário", async () => {
    expect.assertions(1);
    const mockUsuarioAtualizado = {
        ...mockUsuario,
      userName: "nat",
      name: "natalia",
      lastName: "luiza"
    };

    const retorno = await updateUserByUid({uid: mockUsuario.uid, ...mockUsuarioAtualizado});
    expect(mockUsuarioAtualizado).toEqual(retorno);
  });

  it('Dispara um erro caso usuário não seja encontrado', async () => {
    expect.assertions(1)

    try {
     await updateUserByUid({uid: 'uid-nao-encontrado'})
    }
    catch(err){
      expect(err.message).toEqual('Usuário com UID uid-nao-encontrado não existe')
    }
  })
});
