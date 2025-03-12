import { Objeto } from "../basicas.js";
import { Martelo } from "../ferramentas/index.js";

export class Joia extends Objeto {
    constructor() {
        super(
            "Joia Verde",
            "Parece haver um papelzinho dentro da joia."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        // O jogador precisa usar o martelo para quebrar a joia e descobrir a foto escondida.
        this.acaoOk = ferramenta instanceof Martelo;
        // O horário no verso da foto deve ser usado para ajustar os ponteiros na sala de estar.
        if (this.acaoOk) this.descricao = "Há uma foto de uma mulher com a seguinte mensagem no verso: \"Amor da minha vida\", seguida da data e horário 04/05/1997 15:10:00.";
        return this.acaoOk;
    }
}
