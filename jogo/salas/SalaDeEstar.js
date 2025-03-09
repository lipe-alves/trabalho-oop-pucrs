import { Sala, Engine } from "../basicas.js";
import { RelogioAntigo, PortaDeSaida, Compartimento } from "../objetos/index.js";
import { validate } from "bycontract";

export class SalaDeEstar extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Sala de Estar", engine);

        const relogioAntigo = new RelogioAntigo();
        this.objetos.set(relogioAntigo.nome, relogioAntigo);

        const portaDeSaida = new PortaDeSaida();
        this.objetos.set(portaDeSaida.nome, portaDeSaida);
    }

    /**
     * @param {string} nomeObjeto
     * @param {string} horario
     */
    ajustaPonteiros(nomeObjeto, horario) {
        validate(nomeObjeto, "String");
        validate(horario, "String");

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        if (!(objeto instanceof RelogioAntigo)) {
            console.log("Não é possível ajustar os ponteiros desse objeto.");
            return false;
        }

        const acaoOk = objeto.ajustaPonteiros(horario);
        if (!acaoOk) return false;

        const compartimento = new Compartimento();
        this.objetos.set(compartimento.nome, compartimento);

        return true;
    }

    /** 
     * @param {string} nomeObjeto
     * @param {string} codigo  
     */
    discaCodigo(nomeObjeto, codigo) {
        validate(nomeObjeto, "String");
        validate(codigo, "String");

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        if (!(objeto instanceof PortaDeSaida)) {
            console.log("Não é possível discar código nesse objeto.");
            return false;
        }

        const acaoOk = objeto.discaCodigo(codigo);
        if (!acaoOk) return false;

        this.engine.indicaFimDeJogo();

        return true;
    }
}
