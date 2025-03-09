import { Objeto } from "../basicas.js";
import { Faca } from "../ferramentas/index.js";

export class Travesseiro extends Objeto {
    constructor() {
        super(
            "Travesseiro",
            "Estranhamente, o travesseiro é duro. Será que há algo dentro?",
            "Você descobriu uma chave escondida!"
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof Faca;
        return this.acaoOk;
    }
}
