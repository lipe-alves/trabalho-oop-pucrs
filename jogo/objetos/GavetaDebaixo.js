import { Objeto } from "../basicas.js";
import { Grampo } from "../ferramentas/index.js";

export class GavetaDebaixo extends Objeto {
    constructor() {
        super(
            "Gaveta Debaixo",
            "A gaveta está trancada.",
            "Agora a gaveta está aberta, há uma lupa dentro."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof Grampo;
        return this.acaoOk;
    }
}
