import { Objeto } from "../basicas.js";
import { Faca } from "../ferramentas/index.js";

export class Travesseiro extends Objeto {
    constructor() {
        super(
            "Travesseiro",
            "Estranhamente, o travesseiro é duro. Será que há algo dentro?"
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        // O jogador precisa usar a faca para cortar o travesseiro e descobrir a chave.
        this.acaoOk = ferramenta instanceof Faca;
        if (this.acaoOk) this.descricao = "Você descobriu uma chave escondida!";
        return this.acaoOk;
    }
}
