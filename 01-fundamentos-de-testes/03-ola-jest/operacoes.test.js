const { calculaDesconto, somaHorasExtras } = require("./operacoes");

describe("Operações", () => {
  beforeAll(() => {
    console.log('Hook antes de todos os testes');
  }); // para executar antes de todos os testes
  afterAll(() => {
    console.log('Hook após todos os testes');
  }); // para executar após todos os testes
  beforeEach(() => {
    console.log('Hook antes de cada um dos testes iniciar');
  }); // para executar antes de cada um dos testes iniciar
  afterEach(() => {
    console.log('Hook após cada um dos testes finalizar');
  }); // para executar após cada um dos testes finalizar


  /**
   * it.only => unico teste para executar 
   * it.skyp => para pular o teste
   */

  it("Deve somar horas extras", () => {
    const esperado = 10;
    const retornado = somaHorasExtras(5, 5);

    expect(retornado).toBe(esperado);
  });

  it("Deve calcular descontos", () => {
    const esperado = 5;
    const retornado = calculaDesconto(10, 5);

    expect(retornado).toBe(esperado);
  });
});
