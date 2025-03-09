import { Objeto } from "../basicas.js";

export class Armario extends Objeto {
    constructor() {
        super(
            "Armario",
            "",
            ""
        );
    }

    empurra() {
        this.acaoOk = true;
        return this.acaoOk;
    }
}
