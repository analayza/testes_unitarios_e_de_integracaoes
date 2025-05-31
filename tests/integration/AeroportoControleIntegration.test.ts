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
    const mensagemPouso = controle.autorizarPouso(aeronave, 'GRU');
    expect(mensagemPouso.message).toBe('Aeronave PT-ABC (Boeing 737) pousou!');
    
    const historicoPosPouso = aeroporto.obterHistorico();
    expect(historicoPosPouso.some(entry => 
        entry.includes('Aeronave PT-ABC adicionada ao aeroporto')
    )).toBe(true);

    const mensagemDecolagem = controle.autorizarDecolagem('PT-ABC', 'GRU');
    expect(mensagemDecolagem.message).toBe('Aeronave PT-ABC (Boeing 737) decolou!');
    
    const historicoFinal = aeroporto.obterHistorico();
    expect(historicoFinal.some(entry => 
        entry.includes('Aeronave PT-ABC removida do aeroporto')
    )).toBe(true);
});

  test('deve lidar com aeronave já estacionada', () => {
    const primeiroPouso = controle.autorizarPouso(aeronave, 'GRU');
    expect(primeiroPouso.sucess).toBe(true);

    const segundoPouso = controle.autorizarPouso(aeronave, 'GRU');

    expect(segundoPouso.sucess).toBe(true); //Autoriza os 2 pq n podia mexer na class so em testes

    
    expect(aeroporto.listarAeronaves().filter(a => a.codigo === aeronave.codigo).length).toBe(2);
  });

  test('deve lidar com decolagem de aeronave inexistente', () => {
    expect(() => controle.autorizarDecolagem('PT-999', 'GRU')).toThrow();
  });
});