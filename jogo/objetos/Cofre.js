import { validate } from "bycontract";
import { Objeto } from "../basicas.js";

export class Cofre extends Objeto {
    constructor() {
        super(
            "Cofre",
            "O cofre possui um cadeado numérico."
        );
    }

    /** @param {string} codigo */
    discaCodigo(codigo) {
        validate(codigo, "String");
        this.acaoOk = codigo === "3721";
        // Muda a descrição para indicar que tem um bilhete somente se usou o código correto.
        if (this.acaoOk) this.descricao = "O cofre foi aberto, dentro dele, há um pequeno bilhete escrito: 5813.";
        return this.acaoOk;
    }
}
