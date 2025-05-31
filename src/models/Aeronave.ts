import Validation from "../utils/Validation";

export default class Aeronave {

    passageiros: number = 0;
    cargaAtual: number = 0.0;

    constructor(
        public codigo: string,
        public modelo: string,
        public capacidadePassageiros: number,
        public capacidadeCarga: number
    ) { }

    embarcarPassageiro(): Validation { //aqui
        if(this.passageiros + 1 > this.capacidadePassageiros){ //aqui
            return new Validation("Não é possivél embarcar", false)//aqui
        }
        this.passageiros++;
        return new Validation("Passageiro embarcado") //aqui
    }

    desembarcarPassageiro(): Validation {
        if(this.passageiros === 0){
            return new Validation("Sem passageiros", false); //aqui
        }
        this.passageiros--;
        return new Validation ("Passageiro desembarcado");
    }

    embarcarCarga(pesoCarga: number): Validation {
        if(this.cargaAtual + pesoCarga > this.capacidadeCarga){
            return new Validation("Ultrapassou o limite de carga", false);  //aqui
        }
        this.cargaAtual += pesoCarga;
        return new Validation("Carga embarcada");
    }

    decolar(): string {
        return `Aeronave ${this.codigo} (${this.modelo}) decolou!`;
    }

    pousar(): string {
        return `Aeronave ${this.codigo} (${this.modelo}) pousou!`;
    }
}