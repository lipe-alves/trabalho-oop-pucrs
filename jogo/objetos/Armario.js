import { Objeto } from "../basicas.js";

export class Armario extends Objeto {
    constructor() {
        super(
            "Armario",
            ""
        );
    }

    empurra() {
        this.acaoOk = true;
        this.descricao = "Uma portinha secreta se revela por de trás do armário.";
        return this.acaoOk;
    }
}
