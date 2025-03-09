import { Objeto } from "../basicas.js";
import { ChaveDeFenda } from "../ferramentas/index.js";

export class Abajur extends Objeto {
    constructor() {
        super(
            "Abajur",
            "O abajur está desligado.",
            "O abajur está ligado e ilumina o quadro."
        );
    }

    liga() {
        this.acaoOk = true; 
        return this.acaoOk;
    }
}
