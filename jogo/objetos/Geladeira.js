import { Objeto } from "../basicas.js";
import { Isqueiro } from "../ferramentas/index.js";

export class Geladeira extends Objeto {
    constructor() {
        super(
            "Geladeira",
            "Parece haver algo brilhante congelado dentro do congelador.",
            "Uma joia verde brilhante soltou-se do gelo."
        );
    }

    usa(ferramenta) {
        super.usa(ferramenta);
        this.acaoOk = ferramenta instanceof Isqueiro;
        return this.acaoOk;
    }
}
