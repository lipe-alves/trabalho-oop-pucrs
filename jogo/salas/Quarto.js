import { Sala, Engine } from "../basicas.js";
import { SalaDeEstar } from "../salas/index.js";

export class Quarto extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Quarto", engine);
    }
}