import ControleTraficoAereo from '../../src/services/ControleTraficoAereo';
import Aeronave from '../../src/models/Aeronave';
import Aeroporto from '../../src/models/Aeroporto';

jest.mock('../../src/models/Aeroporto');
jest.mock('../../src/models/Aeronave');

const MockAeroporto = Aeroporto as jest.MockedClass<typeof Aeroporto>;
const MockAeronave = Aeronave as jest.MockedClass<typeof Aeronave>;

describe('ControleTraficoAereo - Testes de Unidade com Mock', () => {
  let controle: ControleTraficoAereo;
  let mockAeroporto: jest.Mocked<Aeroporto>;
  let mockAeronave: jest.Mocked<Aeronave>;

  beforeEach(() => {
    MockAeroporto.mockClear();
    MockAeronave.mockClear();

    mockAeroporto = new MockAeroporto('Teste', 'TST') as jest.Mocked<Aeroporto>;
    mockAeronave = new MockAeronave('PT-TST', 'Teste', 0, 0) as jest.Mocked<Aeronave>;
    mockAeronave.codigo = 'PT-TST';
    
    controle = new ControleTraficoAereo([mockAeroporto]);
  });

  describe('registrarAeroporto', () => {
    test('deve registrar novo aeroporto', () => {
      const novoAeroporto = new MockAeroporto('Novo', 'NOV');
      controle.registrarAeroporto(novoAeroporto);
      expect(controle['aeroportos']).toContain(novoAeroporto);
    });
  });

  describe('autorizarDecolagem', () => {
    test('deve autorizar decolagem válida', () => {
      mockAeroporto.codigoIATA = 'TST';
      mockAeroporto.buscarAeronavePorCodigo.mockReturnValue(mockAeronave);
      mockAeroporto.removerAeronave.mockReturnValue(true);
      mockAeronave.decolar.mockReturnValue('Decolou mock');

      const resultado = controle.autorizarDecolagem('PT-TST', 'TST');

      expect(resultado.message).toBe('Decolou mock'); // Alterado aqui
      expect(mockAeroporto.registrarEvento).toHaveBeenCalledWith(
        'Decolagem autorizada para PT-TST'
      );
    });

    test('deve lançar erro para aeroporto não encontrado', () => {
      expect(() => controle.autorizarDecolagem('PT-TST', 'INV'))
        .toThrow('Aeroporto INV não encontrado');
    });

    test('deve lançar erro para aeronave não encontrada', () => {
      mockAeroporto.codigoIATA = 'TST';
      mockAeroporto.buscarAeronavePorCodigo.mockReturnValue(undefined);

      expect(() => controle.autorizarDecolagem('PT-TST', 'TST'))
        .toThrow('Aeronave PT-TST não encontrada no aeroporto TST');
    });
  });

  describe('autorizarPouso', () => {
    test('deve autorizar pouso válido', () => {
      mockAeronave.codigo = 'PT-TST';

      mockAeroporto.codigoIATA = 'TST';
      mockAeronave.pousar.mockReturnValue('Pousou mock');

      const resultado = controle.autorizarPouso(mockAeronave, 'TST');

      expect(resultado.message).toBe('Pousou mock');
      expect(mockAeroporto.adicionarAeronave).toHaveBeenCalledWith(mockAeronave);
      expect(mockAeroporto.registrarEvento).toHaveBeenCalledWith(
        'Pouso autorizado para PT-TST'
      );
    });
    test('deve lançar erro para aeroporto não encontrado', () => {
      expect(() => controle.autorizarPouso(mockAeronave, 'INV'))
        .toThrow('Aeroporto INV não encontrado');
    });
  });
});