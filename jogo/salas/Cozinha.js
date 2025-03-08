import { Sala, Engine } from "../basicas.js";
import { SalaDeEstar } from "../salas/index.js";

export class Cozinha extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Cozinha", engine);
    }
}