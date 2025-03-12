import { Objeto } from "../basicas.js";
import { validate } from "bycontract";

export class RelogioAntigo extends Objeto {
    constructor() {
        super(
            "Relogio Antigo",
            "Uma verdadeira relíquia antiquada... Os ponteiros parecem estar travados."
        );
    }

    /** @param {string} horario */
    ajustaPonteiros(horario) {
        validate(horario, "String");
        // Verifica se o horário ajustado é o certo.
        this.acaoOk = horario === "15:10:00";
        // Se sim, muda a descrição para indicar que o compartimento soltou-se.
        if (this.acaoOk) this.descricao = "Um compartimento soltou-se para fora.";
        return this.acaoOk;
    }
}
