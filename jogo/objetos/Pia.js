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
        // O jogador precisa usar a pinça para pegar o bilhete escondido no ralo.
        this.acaoOk = ferramenta instanceof Pinca;
        // Se usou a pinça, muda a descrição para dizer o que tem escrito no bilhete.
        if (this.acaoOk) this.descricao = "O papel contém o seguinte número: 21.";
        return this.acaoOk;
    }
}
