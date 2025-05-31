import ControleTraficoAereo from '../../src/services/ControleTraficoAereo';
import Aeronave from '../../src/models/Aeronave';
import Aeroporto from '../../src/models/Aeroporto';

describe('Integração Aeroporto e ControleTráfegoAereo', () => {
  let controle: ControleTraficoAereo;
  let aeroporto: Aeroporto;
  let aeronave: Aeronave;

  beforeEach(() => {
    aeroporto = new Aeroporto('Aeroporto Internacional', 'GRU');
    controle = new ControleTraficoAereo([aeroporto]);
    aeronave = new Aeronave('PT-ABC', 'Boeing 737', 180, 20000);
  });

  test('deve completar ciclo de voo (pouso e decolagem)', () => {
    // Pouso
    const mensagemPouso = controle.autorizarPouso(aeronave, 'GRU');
    expect(mensagemPouso).toBe('Aeronave PT-ABC (Boeing 737) pousou!');
    expect(aeroporto.listarAeronaves()).toContain(aeronave);

    // Decolagem
    const mensagemDecolagem = controle.autorizarDecolagem('PT-ABC', 'GRU');
    expect(mensagemDecolagem).toBe('Aeronave PT-ABC (Boeing 737) decolou!');
    expect(aeroporto.listarAeronaves()).not.toContain(aeronave);

    // Verifica histórico
    const historico = aeroporto.obterHistorico();
    expect(historico[0]).toContain('Pouso autorizado para PT-ABC');
    expect(historico[1]).toContain('Decolagem autorizada para PT-ABC');
  });

  test('deve lidar com aeronave já estacionada', () => {
    controle.autorizarPouso(aeronave, 'GRU');
    expect(() => controle.autorizarPouso(aeronave, 'GRU')).toThrow();
  });

  test('deve lidar com decolagem de aeronave inexistente', () => {
    expect(() => controle.autorizarDecolagem('PT-999', 'GRU')).toThrow();
  });
});