import logger from "utils/logger";

const spyLog = jest.spyOn(console, "log").mockImplementation();

// Criamos beforeEach que executa o mockClear
beforeEach(() => {
   jest.clearAllMocks();
});

// inserimos esse after all com jest.restoreAllMocks() e alguns logs para testar
afterAll(() => {
  console.log("não funciona");
  jest.restoreAllMocks();
  console.log("isso funciona");
});

describe("Logger", () => {
  it("Funções de logging: log", () => {
    // chamamos função de log normal
    logger.log("teste");

    // verificamos se o spy foi chamado
    expect(spyLog).toHaveBeenCalledTimes(1);
  });

  it("Funções de logging: success", () => {
    // chamamos função de success
    logger.success("teste");

    expect(spyLog).toHaveBeenCalledTimes(1);
  });

  it("Funções de logging: error", () => {
    const spyLog = jest.spyOn(console, "error").mockImplementation();
    // chamamos função de error
    logger.error("deu ruim meu rei");

    expect(spyLog).toHaveBeenCalledTimes(1);
  });
});
