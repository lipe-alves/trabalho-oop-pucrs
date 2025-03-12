import { Objeto } from "../basicas.js";
import { PanoDePrato } from "../ferramentas/index.js";

export class QuadroEmpoeirado extends Objeto {
    constructor() {
        super(
            "Quadro Empoeirado",
            "O quadro está empoeirado e sujo, impossível de se definir seu desenho."
        );
    }

    /** Esse método é usado externamente para revelar os números, mudando a descrição do objeto. */
    revelaNumeros() {
        this.descricao = "O abajur ao iluminar o quadro revelou um número escondido: 7.";
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        // O jogador precisa usar o pano de prato para limpar o quadro para, em seguida, ligar o abajur e revelar o número.
        this.acaoOk = ferramenta instanceof PanoDePrato;
        if (this.acaoOk) this.descricao = "O quadro está em branco?";
        return this.acaoOk;
    }
}
