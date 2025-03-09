import { Objeto } from "../basicas.js";
import { ChaveDoPorao, Grampo } from "../ferramentas/index.js";

export class PortaDoPorao extends Objeto {
    constructor() {
        super(
            "Porta do Porao",
            "A porta está trancada.",
            "A porta está destrancada, agora, você pode sair para a sala de estar."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof ChaveDoPorao || ferramenta instanceof Grampo;
        return this.acaoOk;
    }
}
