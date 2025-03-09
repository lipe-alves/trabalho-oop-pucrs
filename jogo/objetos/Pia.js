import { Objeto } from "../basicas.js";
import { Pinca } from "../ferramentas/index.js";

export class Pia extends Objeto {
    constructor() {
        super(
            "Pia",
            "Parece haver um papelzinho preso no ralo da pia. Você não consegue por a mão para pegar."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof Pinca;
        if (this.acaoOk) this.descricao = "O papel contém o seguinte número: 21.";
        return this.acaoOk;
    }
}
