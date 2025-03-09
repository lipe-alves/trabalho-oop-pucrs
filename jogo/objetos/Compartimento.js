import { Objeto } from "../basicas.js";
import { Lupa } from "../ferramentas/index.js";

export class Compartimento extends Objeto {
    constructor() {
        super(
            "Compartimento do Relogio",
            "Há um número minúsculo entalhado na madeira. Impossível de ver sem uma lupa."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof Lupa;
        if (this.acaoOk) this.descricao = "O número minúsculo entalhado parece-se com o 3.";
        return this.acaoOk;
    }
}
