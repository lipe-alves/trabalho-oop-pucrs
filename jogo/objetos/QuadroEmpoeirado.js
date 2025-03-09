import { Objeto } from "../basicas.js";
import { PanoDePrato } from "../ferramentas/index.js";

export class QuadroEmpoeirado extends Objeto {
    constructor() {
        super(
            "Quadro Empoeirado",
            "O quadro está empoeirado e sujo, impossível de se definir seu desenho.",
            "O quadro está em branco?"
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof PanoDePrato;
        return this.acaoOk;
    }
}
