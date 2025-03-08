import { Sala, Engine } from "../basicas.js";
import { Quarto, Cozinha } from "../salas/index.js";
import { RelogioAntigo, PortaDeSaida, Compartimento } from "../objetos/index.js";

export class SalaDeEstar extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Sala de Estar", engine);

        const relogioAntigo = new RelogioAntigo();
        this.objetos.set(relogioAntigo.nome, relogioAntigo);

        const portaDeSaida = new PortaDeSaida();
        this.objetos.set(portaDeSaida.nome, portaDeSaida);
    }

    discaCodigo(nomeObjeto, codigo) {
        const acaoOk = super.discaCodigo(nomeObjeto, codigo);
        if (!acaoOk) return false;

        const objeto = this.objetos.get(nomeObjeto);
        if (objeto instanceof PortaDeSaida) {
            this.engine.indicaFimDeJogo();
        }

        return true;
    }

    ajustaPonteiros(nomeObjeto, horario) {
        const acaoOk = super.ajustaPonteiros(nomeObjeto, horario);
        if (!acaoOk) return false;

        const objeto = this.objetos.get(nomeObjeto);
        if (objeto instanceof RelogioAntigo) {
            const compartimento = new Compartimento();
            this.objetos.set(compartimento.nome, compartimento);
        }

        return true;
    }
}
