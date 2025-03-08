import { Objeto } from "../basicas.js";

export class RelogioAntigo extends Objeto {
    constructor() {
        super(
            "Relogio Antigo",
            "Uma verdadeira relíquia antiquada... Os ponteiros parecem estar travados.",
            "Um compartimento soltou-se para fora."
        );
    }

    /** @param {string} horario */
    ajustaPonteiros(horario) {
        super.ajustaPonteiros(horario);
        this.acaoOk = horario === "15:10:00";
        return this.acaoOk;
    }
}
