import { Objeto } from "../basicas.js";
import { Isqueiro } from "../ferramentas/index.js";

export class Geladeira extends Objeto {
    constructor() {
        super(
            "Geladeira",
            "Parece haver algo brilhante congelado dentro do congelador."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        // Somente o isqueiro consegue descongelar o gelo por causa do seu calor.
        this.acaoOk = ferramenta instanceof Isqueiro;
        // Quando descongela, mostra através da descrição que tinha uma joia escondida no gelo.
        if (this.acaoOk) this.descricao = "Uma joia verde brilhante soltou-se do gelo.";
        return this.acaoOk;
    }
}
