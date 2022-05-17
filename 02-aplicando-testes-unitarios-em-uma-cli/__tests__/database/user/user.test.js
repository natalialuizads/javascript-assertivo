import { getUserByUid } from "database/user/read.js";
import { loadDatabase } from "database/file.js";
import { getUserByUsernameAndPassword } from "../../../src/database/user/read";

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

describe("User", () => {
  it("Encontra usuário quando encontra seu UID", async () => {
    expect.assertions(1);
    const usuario = await getUserByUid("abc-1234");
    expect(usuario).toEqual(mockUsuario);
  });

  it("Dispara um erro caso usuário não seja encontrado", async () => {
    expect.assertions(1);
    try {
      await getUserByUid("uid-não-existente");
    } catch (err) {
      expect(err.message).toEqual("Não existe usuário com uid informado.");
    }
  });

  it("Encontra usuario pelo UserName e password", async () => {
    expect.assertions(1);
    const usuario = await getUserByUsernameAndPassword(
      "nomeDousuario",
      "senhasuperescreta"
    );
    expect(usuario).toEqual(mockUsuario);
  });

  it("Dispara um erro caso usuário não seja encontrado", async () => {
    expect.assertions(1);
    try {
      await getUserByUsernameAndPassword("user", "senha");
    } catch (err) {
      expect(err.message).toEqual(
        "Credenciais incorretas ou usuário inexistente."
      );
    }
  });
});
