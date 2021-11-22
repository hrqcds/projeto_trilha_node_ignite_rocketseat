// informa o que o testa tá fazendo
// recebece um titulo e uma arrow function
describe("Criar Categoria", () => {
  // função que executa o teste
  // Recebe uma descrição e uma função
  it("Espero que 2 + 2 seja 4", () => {
    // Testa acontece aqui
    const soma = 2 + 2;
    const resultado = 4;

    // Resultado esperado
    // diversas funções dentro do expect como toBe()
    expect(soma).toBe(resultado); // toBe == Seja -> traduzindo: Espero que minha soma seja igual ao resultado
  });

  it("Espero que 2 + 2 != 5", () => {
    const soma = 2 + 2;
    const resultado = 5;

    expect(soma).not.toBe(resultado); // not.toBe == não seja -> traduzindo: Espero que minha soma não seja igual ao resultado
  });
});
