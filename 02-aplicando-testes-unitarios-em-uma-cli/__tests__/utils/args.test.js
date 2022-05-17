import parse, { validateArgs, MESSAGES } from "utils/args";

const dados = {
  username: "admin",
  password: "admin",
  operation: "operacao",
  data: {
    uid: "abc-123",
  },
};

it("Faz o parse dos argumentos da CLI", () => {
  const argumentos = [
    "/Users/natalia/.nvm/versions/node/v16.14.2/bin/node",
    "/Users/natalia/.nvm/versions/node/v16.14.2/bin/jsassertivo",
    "--username=admin",
    "--password=admin",
    "--operation=operacao",
    '--data={"uid": "abc-123"}',
  ];
  ("");
  const retornado = parse(argumentos);

  expect(retornado).toEqual(dados);
});

describe("Validação de argumentos da CLI", () => {
  it("Valida com sucesso os campos informados", () => {
    const campos = ["username", "password", "operation", "data"];

    expect(validateArgs(dados, campos).valid).toEqual(true);
    expect(validateArgs(dados).valid).toEqual(true);
  });

  it("Valida os cenários de erro e retorna uma mensagem", () => {
    expect(validateArgs()).toEqual({
      valid: false,
      message: expect.any(String),
    });

    expect(validateArgs(dados, ["email"])).toEqual({
      valid: false,
      message: expect.any(String),
    });
  });
});

describe(`Validação de mensagem da CLI`, () => {
  it("Valida se ao chamar missingArgs e missingArg é retornando mensagem", () => {
    expect(MESSAGES.missingArgs()).toEqual(
      "Você precisa fornecer os argumentos corretos para a CLI"
    );
    expect(MESSAGES.missingArg("user")).toEqual(
      "Você precisa informar o argumento user"
    );
  });
});
