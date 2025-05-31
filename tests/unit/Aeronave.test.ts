import Aeronave from '../../src/models/Aeronave';

describe('Aeronave - Testes de Unidade', () => {
  let aeronave: Aeronave;

  beforeEach(() => {
    aeronave = new Aeronave('PT-ABC', 'Boeing 737', 180, 20000);
  });

  // Teste de criação
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
      expect(resultado).toBe('Passageiro embarcado');
    });

    test('deve lançar erro ao exceder capacidade', () => {
      aeronave.passageiros = aeronave.capacidadePassageiros;
      expect(() => aeronave.embarcarPassageiro()).toThrow('Capacidade máxima de passageiros atingida');
    });
  });


  describe('desembarcarPassageiro', () => {
    test('deve desembarcar quando há passageiros', () => {
      aeronave.passageiros = 5;
      const resultado = aeronave.desembarcarPassageiro();
      expect(aeronave.passageiros).toBe(4);
      expect(resultado).toBe('Passageiro desembarcado');
    });

    test('deve lançar erro quando não há passageiros', () => {
      expect(() => aeronave.desembarcarPassageiro()).toThrow('Não há passageiros para desembarcar');
    });
  });


  describe('embarcarCarga', () => {
    test('deve embarcar carga dentro do limite', () => {
      const resultado = aeronave.embarcarCarga(500);
      expect(aeronave.cargaAtual).toBe(500);
      expect(resultado).toBe('Carga embarcada');
    });

    test('deve lançar erro ao exceder capacidade', () => {
      aeronave.cargaAtual = aeronave.capacidadeCarga - 100;
      expect(() => aeronave.embarcarCarga(200)).toThrow('Capacidade de carga excedida');
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

  //fluxo completo
  test('deve simular um voo completo', () => {
    const aeronave = new Aeronave('PT-XYZ', 'Airbus A320', 50, 1000);
    
    // Embarcar
    expect(aeronave.embarcarPassageiro()).toBe('Passageiro embarcado');
    expect(aeronave.passageiros).toBe(1);
    
    expect(aeronave.embarcarCarga(500)).toBe('Carga embarcada');
    expect(aeronave.cargaAtual).toBe(500);
    
    // Voar
    expect(aeronave.decolar()).toBe('Aeronave PT-XYZ (Airbus A320) decolou!');
    expect(aeronave.pousar()).toBe('Aeronave PT-XYZ (Airbus A320) pousou!');
    
    // Desembarcar
    aeronave.passageiros = 30;
    aeronave.desembarcarPassageiro();
    expect(aeronave.passageiros).toBe(29);
  });
});