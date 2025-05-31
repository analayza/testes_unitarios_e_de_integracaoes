import Aeronave from '../models/Aeronave';
import Aeroporto from '../models/Aeroporto';
import Validation from '../utils/Validation';

export default class ControleTraficoAereo {
  constructor(private aeroportos: Aeroporto[] = []) {}

  registrarAeroporto(aeroporto: Aeroporto): Validation { //aqui
    try{
      this.aeroportos.push(aeroporto);
      return new Validation("Aeroporto registrado")  //aqui
    }catch(Error){
      return new Validation("Aeroporto não registrado", false) //aqui
    }
    
  }

  autorizarDecolagem(codigoAeronave: string, codigoAeroporto: string): Validation { //aqui
    const aeroporto = this.aeroportos.find(a => a.codigoIATA === codigoAeroporto);
    if (!aeroporto) {
      throw new Error(`Aeroporto ${codigoAeroporto} não encontrado`);
    }

    const aeronave = aeroporto.buscarAeronavePorCodigo(codigoAeronave);
    if (!aeronave) {
      throw new Error(`Aeronave ${codigoAeronave} não encontrada no aeroporto ${codigoAeroporto}`);
    }

    aeroporto.removerAeronave(codigoAeronave);
    aeroporto.registrarEvento(`Decolagem autorizada para ${codigoAeronave}`);
    
    return new Validation(aeronave.decolar()); //aqui
  }

  autorizarPouso(aeronave: Aeronave, codigoAeroporto: string): Validation { //aqui
    const aeroporto = this.aeroportos.find(a => a.codigoIATA === codigoAeroporto);
    if (!aeroporto) {
      throw new Error(`Aeroporto ${codigoAeroporto} não encontrado`);
    }

    aeroporto.adicionarAeronave(aeronave);
    aeroporto.registrarEvento(`Pouso autorizado para ${aeronave.codigo}`);
    
    return new Validation(aeronave.pousar()); //aqui
  }
}