import { Objeto } from "../basicas.js";
import { ChaveDeFenda } from "../ferramentas/index.js";

export class BailarinaMusical extends Objeto {
    constructor() {
        super(
            "Bailarina Musical",
            "Uma bailarina toca música empoeirada, ao mexê-la, você ouve algo metálico balançando dentro."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof ChaveDeFenda;
        if (this.acaoOk) this.descricao = "Você descobriu uma chave escondida!";
        return this.acaoOk;
    }
}
