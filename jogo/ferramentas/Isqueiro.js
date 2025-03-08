import { Ferramenta } from "../basicas.js";
import { Porao } from "../salas/index.js";

export class Isqueiro extends Ferramenta {
    constructor() {
        super("Isqueiro");
    }

    /** @param {Sala} sala */
    acende(sala) {
        super.acende(sala);
        return sala instanceof Porao;
    }
}
