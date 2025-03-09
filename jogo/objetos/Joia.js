import { Objeto } from "../basicas.js";
import { Martelo } from "../ferramentas/index.js";

export class Joia extends Objeto {
    constructor() {
        super(
            "Joia Verde",
            "Parece haver um papelzinho dentro da joia.",
            "Há uma foto de uma mulher com a seguinte mensagem no verso: \"Amor da minha vida\", seguida da data e horário 04/05/1997 15:10:00."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof Martelo;
        return this.acaoOk;
    }
}
