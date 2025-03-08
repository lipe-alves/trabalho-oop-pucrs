import { Objeto } from "../basicas.js";

export class PortaDeSaida extends Objeto {
    constructor() {
        super(
            "Porta de Saida",
            "A porta está trancada.",
            "A porta está destrancada, agora, você pode sair para a sala de estar."
        );
    }

    discaCodigo(codigo) {
        super.discaCodigo(codigo);
        this.acaoOk = codigo === "5813";
        return this.acaoOk;
    }
}
