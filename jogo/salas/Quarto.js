import { Sala, Engine } from "../basicas.js";

export class Quarto extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Quarto", engine);
    }
}