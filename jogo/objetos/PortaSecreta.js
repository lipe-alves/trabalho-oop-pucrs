import { Objeto } from "../basicas.js";
import { ChaveSecreta, Grampo } from "../ferramentas/index.js";

export class PortaSecreta extends Objeto {
    constructor() {
        super(
            "Porta Secreta",
            "A porta está trancada."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        // Há duas maneiras de abrir a porta do porão, mas, o jogador deve escolher a maneira certa.
        this.acaoOk = ferramenta instanceof ChaveSecreta || ferramenta instanceof Grampo;
        if (this.acaoOk) this.descricao = "A porta está destrancada.";
        return this.acaoOk;
    }
}
