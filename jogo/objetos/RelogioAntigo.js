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
        this.acaoOk = horario === "15:10:00";
        if (this.acaoOk) this.descricao = "Um compartimento soltou-se para fora.";
        return this.acaoOk;
    }
}
