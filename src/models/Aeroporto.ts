import Aeronave from './Aeronave';

export default class Aeroporto {
    private aeronaves: Aeronave[] = [];
    private historico: string[] = [];

    constructor(public nome: string, public codigoIATA: string) { }

    adicionarAeronave(aeronave: Aeronave): void {
        this.aeronaves.push(aeronave);
        this.registrarEvento(`Aeronave ${aeronave.codigo} adicionada ao aeroporto`);
    }

    listarAeronaves(): Aeronave[] {
        return [...this.aeronaves];
    }

    buscarAeronavePorCodigo(codigo: string): Aeronave | undefined {
        return this.aeronaves.find(a => a.codigo === codigo);
    }

    removerAeronave(codigo: string): boolean {
        const index = this.aeronaves.findIndex(a => a.codigo === codigo);
        if (index !== -1) {
            const [aeronave] = this.aeronaves.splice(index, 1);
            this.registrarEvento(`Aeronave ${aeronave.codigo} removida do aeroporto`);
            return true;
        }
        return false;
    }

    decolarAeronave(codigo: string): string {
        const aeronave = this.buscarAeronavePorCodigo(codigo);

        if (!aeronave) {
            throw new Error(`Aeronave com código ${codigo} não encontrada no aeroporto`);
        }

        this.removerAeronave(codigo);
        this.registrarEvento(`Aeronave ${codigo} decolou do aeroporto`);

        return aeronave.decolar();
    }

    decolarAeronaves(): string[] {
        const mensagens: string[] = [];
        const aeronavesParaDecolar = [...this.aeronaves];

        aeronavesParaDecolar.forEach(aeronave => {
            try {
                const mensagem = this.decolarAeronave(aeronave.codigo);
                mensagens.push(mensagem);
            } catch (error) {
                this.registrarEvento(`Erro ao decolar aeronave ${aeronave.codigo}: ${error instanceof Error ? error.message : String(error)}`);
            }
        });

        return mensagens;
    }

    registrarEvento(evento: string): void {
        this.historico.push(`${new Date().toISOString()} - ${evento}`);
    }

    obterHistorico(): string[] {
        return [...this.historico];
    }
}