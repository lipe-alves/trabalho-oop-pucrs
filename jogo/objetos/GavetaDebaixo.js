import { Objeto } from "../basicas.js";
import { Grampo } from "../ferramentas/index.js";

export class GavetaDebaixo extends Objeto {
    constructor() {
        super(
            "Gaveta Debaixo",
            "A gaveta está trancada."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof Grampo;
        if (this.acaoOk) this.descricao = "Agora a gaveta está aberta, há uma lupa dentro.";
        return this.acaoOk;
    }
}
