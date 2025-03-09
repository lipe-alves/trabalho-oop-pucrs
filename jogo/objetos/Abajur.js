import { Objeto } from "../basicas.js";
import { ChaveDeFenda } from "../ferramentas/index.js";

export class Abajur extends Objeto {
    constructor() {
        super(
            "Abajur",
            "O abajur está desligado."
        );
    }

    liga() {
        this.acaoOk = true;
        this.descricao = "O abajur está ligado e ilumina o quadro.";
        return this.acaoOk;
    }
}
