import { Sala, Engine } from "../basicas.js";

export class SalaDeEstar extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Sala de Estar", engine);
    }
}
