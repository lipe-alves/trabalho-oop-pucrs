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
        // Esta gaveta só pode ser aberta com o grampo, por isso, não se pode utilizar o grampo para abrir a porta do porão.
        this.acaoOk = ferramenta instanceof Grampo;
        // Se abriu com o grampo, muda a descrição para indicar que está aberta.
        if (this.acaoOk) this.descricao = "Agora a gaveta está aberta, há uma lupa dentro.";
        return this.acaoOk;
    }
}
