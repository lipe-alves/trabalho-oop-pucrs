import { Sala, Engine } from "../basicas.js";
import { Pia } from "../objetos/index.js";
import { Pinca } from "../ferramentas/index.js";

export class Banheiro extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Banheiro", engine);

        const pia = new Pia();
        this.objetos.set(pia.nome, pia);

        const pinca = new Pinca();
        this.ferramentas.set(pinca.nome, pinca);
    }
}