import { Ferramenta, Sala } from "../basicas.js";
import { Porao } from "../salas/index.js";
import { validate } from "bycontract";

export class Isqueiro extends Ferramenta {
    constructor() {
        super("Isqueiro");
    }

    /** @param {Sala} sala */
    acende(sala) {
        validate(sala, Sala);
        return sala instanceof Porao;
    }
}
