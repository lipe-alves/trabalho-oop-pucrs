import { Objeto } from "../basicas.js";
import { PanoDePrato } from "../ferramentas/index.js";

export class QuadroEmpoeirado extends Objeto {
    constructor() {
        super(
            "Quadro Empoeirado",
            "O quadro está empoeirado e sujo, impossível de se definir seu desenho."
        );
    }

    revelaNumeros() {
        this.descricao = "O abajur ao iluminar o quadro revelou um número escondido: 7.";
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof PanoDePrato;
        if (this.acaoOk) this.descricao = "O quadro está em branco?";
        return this.acaoOk;
    }
}
