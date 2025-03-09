import { Objeto } from "../basicas.js";
import { validate } from "bycontract";

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
        validate(horario, "String");
        this.acaoOk = horario === "15:10:00";
        return this.acaoOk;
    }
}
