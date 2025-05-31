import Aeronave from '../../src/models/Aeronave';

describe('Aeronave - Testes de Unidade', () => {
  let aeronave: Aeronave;

  beforeEach(() => {
    aeronave = new Aeronave('PT-ABC', 'Boeing 737', 180, 20000);
  });

  test('deve criar uma aeronave corretamente', () => {
    expect(aeronave.codigo).toBe('PT-ABC');
    expect(aeronave.modelo).toBe('Boeing 737');
    expect(aeronave.capacidadePassageiros).toBe(180);
    expect(aeronave.capacidadeCarga).toBe(20000);
    expect(aeronave.passageiros).toBe(0);
    expect(aeronave.cargaAtual).toBe(0);
  });

  describe('embarcarPassageiro', () => {
    test('deve embarcar quando há capacidade', () => {
      const resultado = aeronave.embarcarPassageiro();
      expect(aeronave.passageiros).toBe(1);
      expect(resultado.sucess).toBe(true);
    });

    test('deve lançar erro ao exceder capacidade', () => {
      aeronave.passageiros = aeronave.capacidadePassageiros;
      const resultado = aeronave.embarcarPassageiro();
      expect(resultado.sucess).toBe(false);
    });
  });


  describe('desembarcarPassageiro', () => {
    test('deve desembarcar quando há passageiros', () => {
      aeronave.passageiros = 5;
      const resultado = aeronave.desembarcarPassageiro();
      expect(aeronave.passageiros).toBe(4);
      expect(resultado.sucess).toBe(true);
    });

    test('deve lançar erro quando não há passageiros', () => {
      const resultado = aeronave.desembarcarPassageiro();
      expect(resultado.sucess).toBe(false);
    });
  });


  describe('embarcarCarga', () => {
    test('deve embarcar carga dentro do limite', () => {
      const resultado = aeronave.embarcarCarga(500);
      expect(aeronave.cargaAtual).toBe(500);
      expect(resultado.sucess).toBe(true);
    });

    test('deve lançar erro ao exceder capacidade', () => {
      aeronave.cargaAtual = aeronave.capacidadeCarga - 100;
      const resultado = aeronave.embarcarCarga(200);
      expect(resultado.sucess).toBe(false);
    });
  });


  describe('operações de voo', () => {
    test('decolar deve retornar mensagem correta', () => {
      expect(aeronave.decolar()).toBe('Aeronave PT-ABC (Boeing 737) decolou!');
    });

    test('pousar deve retornar mensagem correta', () => {
      expect(aeronave.pousar()).toBe('Aeronave PT-ABC (Boeing 737) pousou!');
    });
  });

  test('deve simular um voo completo', () => {
    const aeronave = new Aeronave('PT-XYZ', 'Airbus A320', 50, 1000);

    expect(aeronave.embarcarPassageiro().message).toBe('Passageiro embarcado'); // Alterado aqui
    expect(aeronave.passageiros).toBe(1);

    expect(aeronave.embarcarCarga(500).message).toBe('Carga embarcada'); // E aqui
    expect(aeronave.cargaAtual).toBe(500);

    expect(aeronave.decolar()).toBe('Aeronave PT-XYZ (Airbus A320) decolou!');
    expect(aeronave.pousar()).toBe('Aeronave PT-XYZ (Airbus A320) pousou!');

    aeronave.passageiros = 30;
    aeronave.desembarcarPassageiro();
    expect(aeronave.passageiros).toBe(29);
  });
});