import { Engine } from "./basicas.js";
import { Porao } from "./salas/index.js";

export class Jogo extends Engine {
    constructor() {
        super();
    }

    criaCenario() {
        this.salaCorrente = new Porao(this);
    }
}
