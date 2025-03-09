import { Objeto } from "../basicas.js";

export class GavetaDeCima extends Objeto {
    constructor() {
        super(
            "Gaveta de Cima",
            "A gaveta está fechada.",
            "Agora a gaveta está aberta, há um pano de prato e uma faca dentro."
        );
    }

    abre() {
        this.acaoOk = true;
        return this.acaoOk;
    }
}
