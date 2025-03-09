import { Objeto } from "../basicas.js";
import { validate } from "bycontract";

export class PortaDeSaida extends Objeto {
    constructor() {
        super(
            "Porta de Saida",
            "A porta está trancada. Ela possui um cadeado com um código numérico."
        );
    }

    discaCodigo(codigo) {
        validate(codigo, "String");
        this.acaoOk = codigo === "5813";
        if (this.acaoOk) this.descricao = "A porta está destrancada, agora, você pode sair para a sala de estar.";
        return this.acaoOk;
    }
}
